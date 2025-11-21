import { useRef } from 'react';
import AIAvatar from './AIAvatar/AIAvatar';
import StefanAIChat from './StefanAIChat/StefanAIChat';
import styles from './StefanAISection.module.scss';

export default function StefanAISection() {
  const askFromPreset = useRef<((msg: string) => void) | null>(null);

  function sendPreset(text: string) {
    if (askFromPreset.current) {
      askFromPreset.current(text);
    }
  }

  return (
    <div className={styles.stefanAISection}>
      <div className={styles.leftSide}>
        <div className={styles.botCard}>
          <AIAvatar />

          <div className={styles.botPointer}></div>

          <div className={styles.presetButtons}>
            <button onClick={() => sendPreset('What can you do?')}>What can you do?</button>
            <button onClick={() => sendPreset('Show me an example')}>Show me an example</button>
            <button onClick={() => sendPreset('Help me with coding')}>Help me with coding</button>
          </div>
        </div>
      </div>

      <div className="right-side">
        <StefanAIChat onSendPreset={fn => (askFromPreset.current = fn)} />
      </div>
    </div>
  );
}
