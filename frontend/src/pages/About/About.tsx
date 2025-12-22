import StefanAISection from '../../components/StefanAISection/StefanAISection';
import styles from './About.module.scss';

export function About() {
  return (
    <div className={styles.aboutContainer}>
      <h2>About</h2>
      <div className={styles.flexWrap}>
        <div className={styles.info}>
          <p>This is the portfolio website of Stefan Bobrowski, Full-Stack AI Engineer. </p>
          <p>
            Built with a modern 2025 full-stack toolset: Vite + React + TypeScript on the frontend,
            Node + Express on the backend, and Google Cloud Platform for hosting and AI services.
          </p>

          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Technology</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Front-End Framework</td>
                <td>React + TypeScript (Vite)</td>
              </tr>
              <tr>
                <td>3D / Visualization</td>
                <td>Three.js, react-three/fiber, @react-three/drei, Lottie animations</td>
              </tr>
              <tr>
                <td>Back-End Framework</td>
                <td>Node.js + Express</td>
              </tr>
              <tr>
                <td>AI / Video Analysis</td>
                <td>Vertex AI — Gemini 2.5 Flash</td>
              </tr>
              <tr>
                <td>Hosting</td>
                <td>Cloud Run</td>
              </tr>
              <tr>
                <td>CI / CD</td>
                <td>Cloud Build (Docker, GitHub repository)</td>
              </tr>
              <tr>
                <td>Database</td>
                <td>Cloud SQL (Postgres)</td>
              </tr>
              <tr>
                <td>Storage</td>
                <td>Cloud Storage (object storage / temporary uploads)</td>
              </tr>
            </tbody>
          </table>
          <div style={{ marginTop: '1.5rem' }}>
            <h3>Visualization & 3D</h3>
            <p>
              The immersive Room experience is built with Three.js via react-three/fiber and
              @react-three/drei. It features primitive geometries (BoxGeometry, RoundedBox), image
              textures, dynamic lighting (RectAreaLight, PointLight, SpotLight), soft shadows,
              particle snow effects, OrbitControls for camera navigation. The scene maintains smooth
              performance across devices with optimized update loops.
            </p>
          </div>
        </div>

        <StefanAISection />
      </div>
    </div>
  );
}
