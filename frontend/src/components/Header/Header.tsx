import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import stefanPic from '../../assets/stefan.jpg';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.brand}>
            <div className={styles.brandImage}>
              <img src={stefanPic} alt="Stefan Bobrowski" className={styles.logo} />
            </div>
            <span>Stefan Bobrowski</span>
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
      </div>
    </header>
  );
}
