import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { usePageMetaTags } from '../../hooks/usePageMetaTags';
import RoomInstructions from '../../components/Room/RoomInstructions';
import styles from './Home.module.scss';

const Room = lazy(() => import('../../components/Room/Room'));

export function Home() {
  usePageMetaTags({
    title: 'Stefan Bobrowski - Frontend Engineer & SEO Specialist',
    description:
      'Frontend Engineer with 10+ years building scalable web applications. AI-powered systems, React, TypeScript, Node.js. Help small businesses implement SEO strategies.',
    ogTitle: 'Stefan Bobrowski - Frontend Engineer',
    ogDescription:
      'Explore my interactive portfolio featuring AI integrations, 3D visualizations, and modern Frontend projects.',
  });

  return (
    <div className={styles.homeWrapper}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Available for new opportunities</p>
          <h1 className={styles.heroName}>Stefan Bobrowski</h1>
          <h2 className={styles.heroTitle}>
            Frontend Engineer
            <span className={styles.heroStack}>
              JavaScript &nbsp;·&nbsp; TypeScript &nbsp;·&nbsp; React &nbsp;·&nbsp; Node.js
            </span>
          </h2>
          <p className={styles.heroTagline}>I build scalable, production-ready web applications.</p>
          <ul className={styles.heroStats}>
            <li>10+ years shipping Frontend applications in production</li>
            <li>JavaScript, TypeScript, React, SCSS, Vite, and more</li>
            <li>API Development with Node.js and Express</li>
            <li>Cloud architecture and services on Google Cloud Platform</li>
            <li>AI integrations with Claude, Gemini, and Vertex AI</li>
          </ul>
          <div className={styles.heroActions}>
            <div className={styles.heroCtas}>
              <Link to="/skills" className={styles.ctaPrimary}>
                <span>View Skills</span>
              </Link>
              <Link to="/projects" className={styles.ctaSecondary}>
                <span>View Projects</span>
              </Link>
              <Link to="/resume" className={styles.ctaSecondary}>
                <span>View Resume</span>
              </Link>
            </div>
            <div className={styles.heroSocials}>
              <a
                href="https://github.com/stefanbobrowski"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/stefanbobrowski"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </section>
      <Suspense
        fallback={
          <div className={styles.suspenseFallback}>
            <span className={styles.spinner} aria-label="Loading" />
          </div>
        }
      >
        <Room />
      </Suspense>
      <RoomInstructions />
    </div>
  );
}
