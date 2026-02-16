import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.description}>
          Oops! Looks like you took a wrong turn. The page you're looking for doesn't exist.
        </p>
        <Link to="/" className={styles.button}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
