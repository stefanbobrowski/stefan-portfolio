import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';
import { SiLeetcode, SiGmail } from 'react-icons/si';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p>Stefan Bobrowski - Full-Stack Web Developer</p>
        <div className={styles.socialLinks}>
          <a
            href="mailto:stefanbobrowski1@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <SiGmail />
          </a>

          <a
            href="https://github.com/stefanbobrowski"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/stefanbobrowski"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://stackoverflow.com/users/3317728/stefanbob"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="StackOverflow"
          >
            <FaStackOverflow />
          </a>

          <a
            href="https://leetcode.com/u/StefanBobrowski/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
          >
            <SiLeetcode />
          </a>
        </div>
        <p>© {new Date().getFullYear()} Stefan Bobrowski</p>
      </div>
    </footer>
  );
}
