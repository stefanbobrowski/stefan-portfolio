import { Suspense, lazy } from 'react';
import RoomInstructions from '../../components/Room/RoomInstructions';
import styles from './Home.module.scss';

const Room = lazy(() => import('../../components/Room/Room'));

export function Home() {
  return (
    <div className={styles.homeWrapper}>
      <Suspense fallback={<div>Loading...</div>}>
        <Room />
      </Suspense>
      <RoomInstructions />
    </div>
  );
}
