import { useEffect, useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import styles from './SleepOverlay.module.scss';

export default function SleepOverlay() {
  const isSleeping = useUIStore(state => state.isSleeping);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let t: number | undefined;
    if (isSleeping) {
      // schedule show on next tick to avoid synchronous setState inside effect
      t = window.setTimeout(() => setVisible(true), 0);
    } else {
      // allow fade-out before hiding
      t = window.setTimeout(() => setVisible(false), 350);
    }
    return () => {
      if (t) window.clearTimeout(t);
    };
  }, [isSleeping]);

  if (!visible && !isSleeping) return null;

  // Generate 12 Z's with staggered delays for continuous stream
  const zElements = Array.from({ length: 12 }, (_, i) => (
    <div
      key={i}
      className={styles.floatingZ}
      style={{ '--delay': `${i * 0.25}s` } as React.CSSProperties}
    >
      Z
    </div>
  ));

  return (
    <div className={`${styles.overlay} ${!isSleeping && styles.hidden}`}>
      <div className={styles.contentWrapper}>
        <div className={styles.source}>😴</div>
        {zElements}
        <div className={styles.sunIcon}>☀️</div>
      </div>
    </div>
  );
}
