import { useState, useEffect } from 'react';
import styles from './SkillBoard.module.scss';

type SkillCategory = {
  color: string;
  skills: Record<string, string[]>;
};

type SkillsJson = Record<string, SkillCategory>;

export default function SkillBoard() {
  const [skills, setSkills] = useState<SkillsJson | null>(null);

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then((data: SkillsJson) => setSkills(data));
  }, []);

  if (!skills) return <div>Loading...</div>;

  return (
    <div className={styles.skillBoard}>
      {Object.entries(skills).map(([category, data]) => (
        <section key={category} className={styles.categorySection}>
          <h2 style={{ borderColor: data.color }}>{category.toUpperCase()}</h2>

          <div className={styles.brickContainer}>
            {Object.entries(data.skills).flatMap(([_, arr]) =>
              arr.map(skill => (
                <span
                  key={skill}
                  className={styles.skillBrick}
                  style={{ backgroundColor: data.color }}
                >
                  {skill}
                </span>
              ))
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
