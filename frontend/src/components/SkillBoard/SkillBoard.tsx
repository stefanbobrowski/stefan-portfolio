import { useEffect } from 'react';
import type { SkillsJson } from '../../types/skills';
import { useSkillsStore } from '../../store/skillsStore';
import styles from './SkillBoard.module.scss';

function handleMouseEnter(e: React.MouseEvent<HTMLSpanElement>) {
  e.currentTarget.classList.remove('reverse');
}

function handleMouseLeave(e: React.MouseEvent<HTMLSpanElement>) {
  e.currentTarget.classList.add('reverse');
}

export default function SkillBoard() {
  const skillsData = useSkillsStore(state => state.skillsData);
  const setSkillsData = useSkillsStore(state => state.setSkillsData);

  useEffect(() => {
    if (skillsData) return;
    (async () => {
      try {
        const res = await fetch('/api/skills');
        const ct = res.headers.get('content-type') || '';
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error: ${res.status} - ${text}`);
        }

        if (ct.includes('application/json')) {
          const data = await res.json();
          setSkillsData(data.skills || data);
        } else {
          const text = await res.text();
          console.warn('Expected JSON but got:', text.slice(0, 200));
          setSkillsData({ error: `Unexpected response from server.` } as any);
        }
      } catch (err: any) {
        console.error('Failed to load skills:', err);
        setSkillsData({ error: err.message || 'Failed to load skills' } as any);
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

  if ((skillsData as any).error) {
    return (
      <div className={styles.loading} style={{ color: '#f7b2a0' }}>
        Error loading skills: {(skillsData as any).error}
      </div>
    );
  }

  return (
    <div className={styles.skillBoard}>
      <h2>Skills</h2>
      {Object.entries(skillsData).map(([category, data]) => (
        <section
          key={category}
          className={styles.categorySection}
          style={{ borderColor: data.color, backgroundColor: data.color + '90' }}
        >
          <h2 className={styles.categoryTitle} style={{ color: data.color }}>
            {category.toUpperCase()}
          </h2>

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
