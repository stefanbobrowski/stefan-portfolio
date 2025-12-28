import Room from '../../components/Room/Room';
import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles.homeWrapper}>
      <Room />
    </div>
  );
}
