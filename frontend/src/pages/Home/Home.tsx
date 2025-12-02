import StefanAISection from '../../components/StefanAISection/StefanAISection';
import SkillBoard from '../../components/SkillBoard/SkillBoard';
import Room from '../../components/Room/Room';
import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles.homeWrapper}>
      {/* <section className={styles.introSection}>
        <section>
          <div className={styles.stefanBio}>
            <h1>Stefan Bobrowski</h1>
            <h2>Full-Stack AI Engineer</h2>
            <p>
              Full-Stack AI Engineer with over 10 years of experience building scalable,
              high-performance web applications.
            </p>
            <p>
              The technologies that I specialize in are outlined in the{' '}
              <a href="#home-skills">Skills</a> section below.
            </p>

            <p>
              JavaScript, TypeScript, React, Node.js, and Google Cloud Platform. Focused on
              cloud-native development, AI integration, and modern DevOps workflows.
            </p>
            <p>
              Check out my{' '}
              <a
                href="https://github.com/stefanbobrowski"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              ,{' '}
              <a
                href="https://www.linkedin.com/in/stefanbobrowski/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              , and{' '}
              <a href="/StefanBobrowskiResume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
              .
            </p>

            <p>
              Check out my <a href="#home-skills">Skills</a> below and my{' '}
              <a href="/projects">Projects</a> page.
            </p>
          </div>
        </section>
        <StefanAISection />
      </section>

      <h2 className={styles.sectionHeader} id="home-skills">
        Skills
      </h2>
      <SkillBoard /> */}
      <Room />
    </div>
  );
}
