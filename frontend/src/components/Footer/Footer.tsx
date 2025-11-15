import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      © {new Date().getFullYear()} Stefan Bobrowski — Full Stack Developer
    </footer>
  );
}
