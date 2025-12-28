import { useUIStore } from '../../store/uiStore';

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
    <div
      style={{
        padding: 0,
        minWidth: '420px',
        background: 'linear-gradient(180deg, #0a0e27 0%, #1a1b3e 50%, #2a1f4a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Starry background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(2px 2px at 20% 30%, white, transparent),
            radial-gradient(2px 2px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(2px 2px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 60%, white, transparent)
          `,
          backgroundSize: '200% 200%',
          backgroundPosition: '50% 50%',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', padding: '2.5rem 2rem' }}>
        {/* Icon section */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem',
            fontSize: '4rem',
          }}
        >
          <span style={{ filter: 'drop-shadow(0 0 8px rgba(100, 150, 255, 0.6))' }}>🛏️</span>
          <span
            style={{
              animation: 'float 2s ease-in-out infinite',
              filter: 'drop-shadow(0 0 8px rgba(150, 100, 255, 0.6))',
            }}
          >
            💤
          </span>
        </div>

        <h2
          style={{
            textAlign: 'center',
            fontSize: '2rem',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #6ee7ff 0%, #b388ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 20px rgba(110, 231, 255, 0.3)',
          }}
        >
          Time to Rest?
        </h2>

        <p
          style={{
            textAlign: 'center',
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#c5d9ff',
            marginBottom: '2rem',
            maxWidth: '350px',
            margin: '0 auto 2rem',
          }}
        >
          Take a short rest — the screen will fade and you'll hear a peaceful melody.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={handleRest}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              border: '2px solid rgba(110, 231, 255, 0.5)',
              background:
                'linear-gradient(135deg, rgba(110, 231, 255, 0.15) 0%, rgba(179, 136, 255, 0.15) 100%)',
              color: '#6ee7ff',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow:
                '0 0 15px rgba(110, 231, 255, 0.2), inset 0 0 15px rgba(110, 231, 255, 0.05)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background =
                'linear-gradient(135deg, rgba(110, 231, 255, 0.25) 0%, rgba(179, 136, 255, 0.25) 100%)';
              e.currentTarget.style.boxShadow =
                '0 0 25px rgba(110, 231, 255, 0.4), inset 0 0 20px rgba(110, 231, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background =
                'linear-gradient(135deg, rgba(110, 231, 255, 0.15) 0%, rgba(179, 136, 255, 0.15) 100%)';
              e.currentTarget.style.boxShadow =
                '0 0 15px rgba(110, 231, 255, 0.2), inset 0 0 15px rgba(110, 231, 255, 0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            😴 Rest Now
          </button>
          <button
            type="button"
            onClick={() => closeModal()}
            style={{
              padding: '0.75rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#a0b0c0',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = '#a0b0c0';
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
