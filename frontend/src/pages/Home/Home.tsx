import { Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { usePageMetaTags } from '../../hooks/usePageMetaTags';
import RoomInstructions from '../../components/Room/RoomInstructions';
import styles from './Home.module.scss';

const Room = lazy(() => import('../../components/Room/Room'));

export function Home() {
  usePageMetaTags({
    title: 'Stefan Bobrowski - Full-Stack Engineer & SEO Specialist',
    description:
      'Full-Stack Engineer with 10+ years building scalable web applications. AI-powered systems, React, TypeScript, Node.js. Help small businesses implement SEO strategies.',
    ogTitle: 'Stefan Bobrowski - Full-Stack Engineer',
    ogDescription:
      'Explore my interactive portfolio featuring AI integrations, 3D visualizations, and modern full-stack projects.',
  });

  return (
    <div className={styles.homeWrapper}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow}>Available for new opportunities</p>
          <h1 className={styles.heroName}>Stefan Bobrowski</h1>
          <h2 className={styles.heroTitle}>
            Full Stack Web Developer
            <span className={styles.heroStack}>
              React &nbsp;·&nbsp; Node &nbsp;·&nbsp; TypeScript
            </span>
          </h2>
          <p className={styles.heroTagline}>I build scalable, production-ready web applications.</p>
          <ul className={styles.heroStats}>
            <li>10+ years shipping full-stack applications in production</li>
            <li>AI integrations, 3D experiences, and modern developer tooling</li>
            <li>React, TypeScript, Node.js, JavaScript, Google Cloud Platform, and more</li>
            <li>SEO strategy, analytics, and Astro-powered content sites that rank</li>
            <li>Component design systems with CSS design tokens</li>
          </ul>
          <div className={styles.heroActions}>
            <div className={styles.heroCtas}>
              <Link to="/projects" className={styles.ctaPrimary}>
                View Projects
              </Link>
              <Link to="/resume" className={styles.ctaSecondary}>
                View Resume
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
      <Suspense fallback={<div>Loading...</div>}>
        <Room />
      </Suspense>
      <RoomInstructions />
    </div>
  );
}
