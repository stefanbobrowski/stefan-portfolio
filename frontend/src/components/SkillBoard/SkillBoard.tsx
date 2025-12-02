import { useState, useEffect } from 'react';
import type { SkillsJson } from '../../types/skills';
import styles from './SkillBoard.module.scss';

function handleMouseEnter(e: React.MouseEvent<HTMLSpanElement>) {
  e.currentTarget.classList.remove('reverse');
}

function handleMouseLeave(e: React.MouseEvent<HTMLSpanElement>) {
  e.currentTarget.classList.add('reverse');
}

export default function SkillBoard() {
  const [skillsData, setSkillsData] = useState<SkillsJson | null>(null);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => setSkillsData(data.skills || data));
  }, []);

  if (!skillsData) return <div className={styles.loading}>Loading...</div>;

  return (
    <div className={styles.skillBoard}>
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
