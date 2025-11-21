import StefanAISection from '../../components/StefanAISection/StefanAISection';
import SkillBoard from '../../components/SkillBoard/SkillBoard';
import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles.homeWrapper}>
      <section>
        <h1>Stefan Bobrowski</h1>
        <p>Full-Stack Web Developer</p>
        <p>
          Senior Front-End Developer and Full-Stack Engineer with over 10 years of professional
          experience building scalable, high-performance web applications.
        </p>
        <p>JavaScript focused developer with Cloud and AI experience.</p>
        <p>
          Favorite tech: JavaScript, TypeScript, React, sass, Node.js, Express, Google Cloud
          Platform, Cloud Build, Cloud Run
        </p>

        <p>Check out my GitHub, LinkedIn, or Resume</p>

        <h2>Skills</h2>
        <SkillBoard />
        <h2>Projects</h2>
        <h2>Work / Currently Hosting</h2>
      </section>
      <StefanAISection />
    </div>
  );
}
