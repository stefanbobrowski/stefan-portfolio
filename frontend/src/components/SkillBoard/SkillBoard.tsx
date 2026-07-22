import { useEffect, type MouseEvent } from 'react';
import { useSkillsStore } from '../../store/skillsStore';
import { apiEndpoints } from '../../config/api';
import styles from './SkillBoard.module.scss';
import type { SkillsJson } from '../../types/skills';

type SkillsResponse = SkillsJson;
type ErrorData = { error: string };

function handleMouseEnter(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.classList.remove('reverse');
}

function handleMouseLeave(e: MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.classList.add('reverse');
}

function isErrorData(v: unknown): v is ErrorData {
  if (typeof v !== 'object' || v === null) return false;
  const r = v as Record<string, unknown>;
  return typeof r.error === 'string';
}

export default function SkillBoard() {
  const skillsData = useSkillsStore(state => state.skillsData as SkillsResponse | ErrorData | null);
  const setSkillsData = useSkillsStore(
    state => state.setSkillsData as (data: SkillsResponse | ErrorData) => void
  );

  useEffect(() => {
    if (skillsData) return;
    (async () => {
      try {
        const res = await fetch(apiEndpoints.skills);
        const ct = res.headers.get('content-type') || '';
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error: ${res.status} - ${text}`);
        }

        if (ct.includes('application/json')) {
          const data = await res.json();
          if (data && typeof data === 'object' && 'skills' in data) {
            // Ensure all skills have a string url
            const normalizedSkills = Object.fromEntries(
              Object.entries((data as { skills: SkillsResponse }).skills).map(([cat, catData]) => [
                cat,
                {
                  ...catData,
                  skills: catData.skills.map((skill: SkillsJson[string]['skills'][number]) => ({
                    ...skill,
                    url: typeof skill.url === 'string' ? skill.url : '',
                  })),
                },
              ])
            );
            setSkillsData(normalizedSkills as SkillsResponse);
          } else {
            // Also normalize here in case the shape is already SkillsResponse
            const normalizedSkills = Object.fromEntries(
              Object.entries(data as SkillsResponse).map(([cat, catData]) => [
                cat,
                {
                  ...catData,
                  skills: catData.skills.map((skill: SkillsJson[string]['skills'][number]) => ({
                    ...skill,
                    url: typeof skill.url === 'string' ? skill.url : '',
                  })),
                },
              ])
            );
            setSkillsData(normalizedSkills as SkillsResponse);
          }
        } else {
          const text = await res.text();
          console.warn('Expected JSON but got:', text.slice(0, 200));
          setSkillsData({ error: `Unexpected response from server.` } as unknown as ErrorData);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('Failed to load skills:', message);
        setSkillsData({ error: message } as unknown as ErrorData);
      }
    })();
  }, [skillsData, setSkillsData]);

  if (!skillsData)
    return (
      <div>
        <h2>Skills</h2>
        <div className={styles.loading}>Loading skills...</div>
      </div>
    );

  if (isErrorData(skillsData)) {
    return (
      <div className={styles.loading} style={{ color: '#f7b2a0' }}>
        Error loading skills: {skillsData.error}
      </div>
    );
  }

  const typedSkills = skillsData as SkillsResponse;

  return (
    <div className={styles.skillBoard}>
      <h2>Skills</h2>
      {Object.entries(typedSkills).map(([category, data]) => (
        <section
          key={category}
          className={styles.categorySection}
          style={{ borderColor: data.color, backgroundColor: data.color + '90' }}
        >
          <h2 className={styles.categoryTitle}>{category.toUpperCase()}</h2>

          <div className={styles.brickContainer}>
            {data.skills.map(skill => (
              <a
                key={skill.name}
                href={skill.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.skillBrick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ '--brick-color': data.color } as React.CSSProperties}
              >
                {skill.name}
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
