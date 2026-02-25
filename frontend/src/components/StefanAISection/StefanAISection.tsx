import { useRef } from 'react';
import AIAvatar from './AIAvatar/AIAvatar';
import StefanAIChat from './StefanAIChat/StefanAIChat';
import { useGA4 } from '../../hooks/useGA4';
import styles from './StefanAISection.module.scss';

export default function StefanAISection() {
  const { trackEvent } = useGA4();
  const askFromPreset = useRef<((msg: string) => void) | null>(null);

  function sendPreset(text: string) {
    // Track preset button click
    trackEvent('stefan_ai_preset_clicked', {
      event_category: 'engagement',
      event_label: 'ai_preset_button',
      preset_question: text,
    });

    if (askFromPreset.current) {
      askFromPreset.current(text);
    }
  }

  return (
    <div className={styles.stefanAISection}>
      <div className={styles.leftSide}>
        <div className={styles.botCard}>
          <AIAvatar />

          <div className={styles.presetButtons}>
            <button type="button" onClick={() => sendPreset('What can you do?')}>
              What are you and what can you do?
            </button>
            <button type="button" onClick={() => sendPreset('Tell me about Stefan.')}>
              Tell me about Stefan.
            </button>
            <button type="button" onClick={() => sendPreset('How did Stefan build you?')}>
              How did Stefan build you?
            </button>
            <button type="button" onClick={() => sendPreset('How may I contact Stefan?')}>
              How may I contact Stefan?
            </button>
          </div>
        </div>
      </div>

      <div className="right-side">
        <StefanAIChat onSendPreset={fn => (askFromPreset.current = fn)} />
      </div>
    </div>
  );
}
