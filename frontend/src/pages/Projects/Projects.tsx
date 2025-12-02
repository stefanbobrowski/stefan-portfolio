import { useEffect, useState } from 'react';
import type { Project, ProjectList } from '../../types/projects';

import styles from './Projects.module.scss';

export default function Projects() {
  const [projects, setProjects] = useState<ProjectList>([]);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then((data: ProjectList) => setProjects(data));
  }, []);

  return (
    <div className={styles.projectsPage}>
      <div className={styles.projectsGrid}>
        {projects.map(project => (
          <div key={project.slug} className={styles.card}>
            <img src={project.thumbnail} alt={project.title} className={styles.thumb} />

            <h2>{project.title}</h2>
            <p className={styles.description}>{project.description}</p>

            <ul className={styles.techList}>
              {project.tech.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <div className={styles.links}>
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  Live Site
                </a>
              )}
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
