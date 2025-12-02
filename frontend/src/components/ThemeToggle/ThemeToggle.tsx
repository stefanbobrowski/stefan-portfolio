import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeToggle.module.scss';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button className={styles.toggle} onClick={toggle}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
