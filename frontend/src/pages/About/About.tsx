import { Suspense, lazy } from 'react';
import { usePageMetaTags } from '../../hooks/usePageMetaTags';
import styles from './About.module.scss';

// Lazy load StefanAISection since it imports lottie-react (heavy library)
const StefanAISection = lazy(() => import('../../components/StefanAISection/StefanAISection'));

export function About() {
  usePageMetaTags({
    title: 'About Stefan Bobrowski - Frontend Engineer',
    description:
      'Learn about Stefan Bobrowski, a Frontend engineer with 10+ years of experience building scalable web applications using JavaScript,React, TypeScript, Node.js, and Google Cloud Platform.',
    ogTitle: 'About Stefan Bobrowski',
    ogDescription:
      'Frontend Engineer specializing in modern web technologies, AI integration, and cloud infrastructure.',
  });

  return (
    <div className={styles.aboutContainer}>
      <h2>About</h2>
      <div className={styles.flexWrap}>
        <div className={styles.info}>
          <p>This is the portfolio website of Stefan Bobrowski, Frontend Engineer. </p>
          <p>Built with a modern 2026 Frontend toolset:</p>

          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Technology</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Front-End</td>
                <td>Vite, React, Typescript, SCSS Modules</td>
              </tr>
              <tr>
                <td>3D / Visualization</td>
                <td>Three.js, react-three/fiber, react-three/drei, Lottie</td>
              </tr>
              <tr>
                <td>Back-End</td>
                <td>Node.js, Express</td>
              </tr>
              <tr>
                <td>AI</td>
                <td>Vertex AI, Gemini, Copilot</td>
              </tr>
              <tr>
                <td>Hosting</td>
                <td>Cloud Run</td>
              </tr>
              <tr>
                <td>CI / CD</td>
                <td>Cloud Build, Docker, Github, Github Actions</td>
              </tr>
              <tr>
                <td>Database</td>
                <td>Cloud SQL (Postgres)</td>
              </tr>
              <tr>
                <td>Storage</td>
                <td>Cloud Storage</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: '1.5rem' }}>
            <h3>Visualization & 3D</h3>
            <p>
              The immersive Room experience is built with Three.js with react-three/fiber and
              react-three/drei.
            </p>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <h3>Stefan AI</h3>
            <p>
              Stefan AI uses Vertex AI (via Express API calls to Google Cloud Platform) to generate
              responses based on various data sources and a guiding prompt with strict rules.
            </p>
          </div>
        </div>

        <Suspense fallback={<div />}>
          <StefanAISection />
        </Suspense>
      </div>
    </div>
  );
}
