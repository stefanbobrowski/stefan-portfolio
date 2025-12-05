import { useEffect, useState } from 'react';
import type { ProjectList } from '../../types/projects';
import styles from './Projects.module.scss';

interface ProjectsProps {
  variant?: 'page' | 'desktop';
}

export default function Projects({ variant = 'page' }: ProjectsProps) {
  const [projects, setProjects] = useState<ProjectList>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then((data: ProjectList) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={variant === 'desktop' ? styles.desktopLoading : styles.pageLoading}>
        Loading projects...
      </div>
    );
  }

  return (
    <div className={variant === 'desktop' ? styles.desktopContainer : styles.projectsPage}>
      <div className={variant === 'desktop' ? styles.desktopGrid : styles.projectsGrid}>
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
