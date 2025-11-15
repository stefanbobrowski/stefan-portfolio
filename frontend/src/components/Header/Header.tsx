import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <NavLink to="/" className={styles.brand}>
          Stefan Bobrowski
        </NavLink>
      </div>

      <nav className={styles.nav}>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/resume">Resume</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>

      <div className={styles.right}>
        <ThemeToggle />
      </div>
    </header>
  );
}
