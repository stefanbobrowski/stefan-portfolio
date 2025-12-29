import { useUIStore } from '../../store/uiStore';
import styles from './RestModal.module.scss';

export default function RestModal() {
  const closeModal = useUIStore(state => state.closeModal);

  const playSleepMelody = (duration = 3000) => {
    try {
      type Win = Window & {
        AudioContext?: typeof AudioContext;
        webkitAudioContext?: typeof AudioContext;
      };
      const Ctor = (window as Win).AudioContext ?? (window as Win).webkitAudioContext;
      if (!Ctor) {
        console.warn('AudioContext not available in this environment');
        return;
      }
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.value = 0.0001;

      // gentle pad (two detuned sine oscillators through a lowpass)
      const padGain = ctx.createGain();
      padGain.gain.value = 0.0;
      const padFilter = ctx.createBiquadFilter();
      padFilter.type = 'lowpass';
      padFilter.frequency.value = 1200;
      padFilter.Q.value = 0.7;
      padFilter.connect(padGain);
      padGain.connect(master);

      const pad1 = ctx.createOscillator();
      const pad2 = ctx.createOscillator();
      pad1.type = 'sine';
      pad2.type = 'sine';
      pad1.frequency.value = 130.81; // C3
      pad2.frequency.value = 130.81 * 1.005; // slight detune
      pad1.connect(padFilter);
      pad2.connect(padFilter);
      pad1.start();
      pad2.start();

      // bring pad up
      const now = ctx.currentTime;
      padGain.gain.linearRampToValueAtTime(0.05, now + 0.05);
      master.gain.linearRampToValueAtTime(0.3, now + 0.06);

      // arpeggio notes (simple pattern inspired by game-like arpeggios)
      const arpNotes = [523.25, 659.25, 783.99, 987.77, 783.99, 659.25]; // C5 E5 G5 B5 G5 E5
      const arpInterval = 0.35; // seconds
      const arpCount = Math.ceil(duration / 1000 / arpInterval);
      for (let i = 0; i < arpCount; i++) {
        const freq = arpNotes[i % arpNotes.length] * (i % 12 >= 6 ? 0.5 : 1); // occasional octave drop
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = freq;
        g.gain.value = 0.0;
        const t0 = now + i * arpInterval;
        o.connect(g);
        g.connect(master);
        o.start(t0);
        g.gain.linearRampToValueAtTime(0.15, t0 + 0.02);
        g.gain.linearRampToValueAtTime(0.0, t0 + arpInterval * 0.9);
        o.stop(t0 + arpInterval);
      }

      // gentle bells at the end
      const bellDelay = Math.max(1.5, duration / 1000 - 1.2);
      const bell = ctx.createOscillator();
      const bellG = ctx.createGain();
      bell.type = 'sine';
      bell.frequency.value = 1046.5; // C6
      bell.connect(bellG);
      bellG.connect(master);
      const bellTime = now + bellDelay;
      bell.start(bellTime);
      bellG.gain.setValueAtTime(0.0, bellTime);
      bellG.gain.linearRampToValueAtTime(0.15, bellTime + 0.02);
      bellG.gain.exponentialRampToValueAtTime(0.0001, bellTime + 1.8);
      bell.stop(bellTime + 1.9);

      // schedule master fade
      master.gain.linearRampToValueAtTime(0.0001, now + duration / 1000 + 0.05);

      // stop pad oscillators after duration
      setTimeout(() => {
        try {
          pad1.stop();
          pad2.stop();
        } catch (e) {
          console.warn('Error stopping pad oscillators', e);
        }
      }, duration + 200);

      setTimeout(() => {
        try {
          ctx.close();
        } catch (e) {
          console.warn('Error closing audio context', e);
        }
      }, duration + 400);
    } catch (e) {
      console.warn('AudioContext creation failed', e);
    }
  };

  const handleRest = () => {
    const duration = 5000;
    closeModal();
    const startSleep = useUIStore.getState().startSleep;
    playSleepMelody(duration);
    startSleep(duration);
  };

  return (
    <div className={styles.modalContainer}>
      {/* Starry background */}
      <div className={styles.starryBg} />

      <div className={styles.contentWrapper}>
        {/* Icon section */}
        <div className={styles.iconSection}>
          <span className={styles.bed}>🛏️</span>
          <span className={styles.sleep}>💤</span>
        </div>

        <h2 className={styles.title}>Time to Rest?</h2>

        <p className={styles.description}>
          Take a short rest — the screen will fade and you'll hear a peaceful melody.
        </p>

        <div className={styles.buttonGroup}>
          <button type="button" onClick={handleRest} className={styles.btnPrimary}>
            😴 Rest Now
          </button>
          <button type="button" onClick={() => closeModal()} className={styles.btnSecondary}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
