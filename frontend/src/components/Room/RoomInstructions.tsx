import styles from './Room.module.scss';

function MouseIcon({ side = 'left' }: { side?: 'left' | 'right' }) {
  const left = side === 'left';
  return (
    <svg viewBox="0 0 24 24" className={styles.mouseIcon} aria-hidden>
      <rect
        x="4"
        y="3"
        width="16"
        height="20"
        rx="4"
        ry="4"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.4"
      />
      {left ? (
        <rect x="6" y="4" width="5" height="8" rx="1" ry="1" fill="currentColor" opacity="0.95" />
      ) : (
        <rect x="13" y="4" width="5" height="8" rx="1" ry="1" fill="currentColor" opacity="0.95" />
      )}
    </svg>
  );
}

export default function RoomInstructions() {
  return (
    <div className={styles.instructions} role="region" aria-label="Scene controls">
      <div className={styles.instruction}>
        <MouseIcon side="left" />
        <div className={styles.label}>Left click — interact</div>
      </div>

      <div className={styles.instruction}>
        <MouseIcon side="right" />
        <div className={styles.label}>Right click — rotate camera</div>
      </div>

      <div className={styles.instruction}>
        <div className={styles.kbd}>Esc</div>
        <div className={styles.label}>Close modal / exit</div>
      </div>
    </div>
  );
}
