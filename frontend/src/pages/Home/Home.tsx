import Room from '../../components/Room/Room';
import RoomInstructions from '../../components/Room/RoomInstructions';
import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles.homeWrapper}>
      <Room />
      <RoomInstructions />
    </div>
  );
}
