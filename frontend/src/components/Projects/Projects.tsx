import { useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiGlobe } from 'react-icons/fi';
import styles from './Projects.module.scss';
import { useProjectsStore } from '../../store/projectsStore';
import { apiEndpoints } from '../../config/api';

interface ProjectsProps {
  variant?: 'page' | 'desktop';
}

export default function Projects({ variant = 'page' }: ProjectsProps) {
  const projects = useProjectsStore(state => state.projects);
  const setProjects = useProjectsStore(state => state.setProjects);
  const loading = useProjectsStore(state => state.loading);
  const setLoading = useProjectsStore(state => state.setLoading);

  useEffect(() => {
    if (projects.length > 0) {
      setLoading(false);
      return;
    }
    fetch(apiEndpoints.projects)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, [projects, setProjects, setLoading]);

  if (loading) {
    return (
      <div className={variant === 'page' ? styles.projectsPage : ''}>
        <h2>Projects</h2>
        <p>Loading projects...</p>
      </div>
    );
  }

  return (
    <div className={variant === 'page' ? styles.projectsPage : ''}>
      <h2>Projects</h2>

      <div className={styles.projectsGrid}>
        {projects.map(project => (
          <div key={project.slug} className={styles.card}>
            <img src={project.thumbnail} alt={project.title} className={styles.thumb} />

            <h3>{project.title}</h3>
            <p className={styles.description}>{project.description}</p>

            <ul className={styles.techList}>
              {project.tech.map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>

            <div className={styles.links}>
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                  <FiGlobe style={{ marginRight: 6, verticalAlign: 'middle' }} />
                  Live Site
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubLink}
                >
                  <FaGithub style={{ marginRight: 6, verticalAlign: 'middle' }} />
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
