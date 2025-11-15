import styles from './ThemeToggle.module.scss';
import { useTheme } from '../../hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button className={styles.toggle} onClick={toggle}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
