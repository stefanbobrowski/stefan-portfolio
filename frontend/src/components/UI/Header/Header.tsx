import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../../ThemeToggle/ThemeToggle';
import stefanPic from '../../../assets/StefanBobrowskiAvatar.jpeg';
import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.left}>
          <NavLink to="/" className={styles.brand}>
            <div className={styles.brandImage}>
              <img
                src={stefanPic}
                width="40"
                height="40"
                alt="Stefan Bobrowski"
                className={styles.logo}
              />
            </div>
            <span>Stefan Bobrowski</span>
          </NavLink>
        </div>

        <nav className={styles.nav}>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/resume"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Resume
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            About
          </NavLink>
        </nav>

        <div className={styles.right}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
