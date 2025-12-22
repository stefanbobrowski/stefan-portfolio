import { useState } from 'react';
import { FiMusic, FiPlay, FiPause } from 'react-icons/fi';
import RoomMusic from './RoomMusic';
import styles from './RoomMusicToggle.module.scss';

export default function RoomMusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.musicToggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
        onClick={() => setIsPlaying(p => !p)}
      >
        <FiMusic size={20} style={{ marginRight: 6, opacity: 0.7 }} />
        {isPlaying ? <FiPause size={20} /> : <FiPlay size={20} />}
      </button>
      <RoomMusic isPlaying={isPlaying} />
    </>
  );
}
