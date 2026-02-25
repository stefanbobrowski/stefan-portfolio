import { Suspense, lazy } from 'react';
import { usePageMetaTags } from '../../hooks/usePageMetaTags';
import RoomInstructions from '../../components/Room/RoomInstructions';
import styles from './Home.module.scss';

const Room = lazy(() => import('../../components/Room/Room'));

export function Home() {
  usePageMetaTags({
    title: 'Stefan Bobrowski - Full-Stack Engineer & SEO Specialist',
    description:
      'Full-Stack Engineer with 10+ years building scalable web applications. AI-powered systems, React, TypeScript, Node.js. Help small businesses implement SEO strategies.',
    ogTitle: 'Stefan Bobrowski - Full-Stack Engineer',
    ogDescription:
      'Explore my interactive portfolio featuring AI integrations, 3D visualizations, and modern full-stack projects.',
  });

  return (
    <div className={styles.homeWrapper}>
      <Suspense fallback={<div>Loading...</div>}>
        <Room />
      </Suspense>
      <RoomInstructions />
    </div>
  );
}
