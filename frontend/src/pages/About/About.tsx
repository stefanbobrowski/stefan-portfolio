import StefanAISection from '../../components/StefanAISection/StefanAISection';
import styles from './About.module.scss';

export function About() {
  return (
    <div className={styles.aboutContainer}>
      <h2>About</h2>
      <div className={styles.flexWrap}>
        <div className={styles.info}>
          <p>This is the portfolio website of Stefan Bobrowski, Full-Stack Engineer. </p>
          <p>Built with a modern 2026 full-stack toolset:</p>

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
        </div>

        <StefanAISection />
      </div>
    </div>
  );
}
