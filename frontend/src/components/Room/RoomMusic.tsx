import { useEffect, useRef } from 'react';

// Utility: shuffle hats for jungle swing
function jungleShuffle(beat: number) {
  // 16th note shuffle: accent 1, 4, 7, 10, 13, 16
  return [0, 3, 6, 9, 12, 15].includes(beat % 16);
}

export default function RoomMusic({ isPlaying }: { isPlaying: boolean }) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const stopRef = useRef(false);

  useEffect(() => {
    if (!isPlaying) {
      stopRef.current = true;
      return;
    }
    stopRef.current = false;
    let ctx = audioCtxRef.current;
    if (!ctx) {
      ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioCtxRef.current = ctx;
    }

    // --- PARAMETERS ---
    const BPM = 174;
    const beatDur = 60 / BPM; // quarter note
    const barDur = beatDur * 4;
    const swing = 0.04; // shuffle swing for hats

    // --- CHORD PROGRESSION (dreamy/jazzy) ---
    const chords = [
      [220, 277.18, 329.63, 415.3], // A7sus2
      [246.94, 311.13, 392, 466.16], // Bm9
      [174.61, 220, 293.66, 349.23], // Fmaj7
      [196, 246.94, 329.63, 392], // Gmaj9
    ];

    // --- PLAYERS ---
    function playPad(chord: number[], time: number, duration: number) {
      if (!ctx) return;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.045, time + 0.4);
      gain.gain.linearRampToValueAtTime(0.045, time + duration - 0.4);
      gain.gain.linearRampToValueAtTime(0, time + duration);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;
      filter.Q.value = 0.7;
      gain.connect(filter).connect(ctx.destination);

      chord.forEach(note => {
        for (let d of [-7, 0, 7]) {
          const osc = ctx.createOscillator();
          osc.type = 'triangle';
          osc.frequency.value = note;
          osc.detune.value = d;
          osc.connect(gain);
          osc.start(time);
          osc.stop(time + duration);
        }
      });
    }

    function playSubBass(root: number, time: number, duration: number) {
      if (!ctx) return;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.13, time + 0.03);
      gain.gain.linearRampToValueAtTime(0.13, time + duration - 0.05);
      gain.gain.linearRampToValueAtTime(0, time + duration);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 90;
      filter.Q.value = 1.2;
      gain.connect(filter).connect(ctx.destination);

      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = root / 2; // sub octave
      osc.connect(gain);
      osc.start(time);
      osc.stop(time + duration);
    }

    // --- JUNGLE BREAKBEAT ---
    function playKick(time: number, velocity = 1) {
      if (!ctx) return;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, time);
      osc.frequency.exponentialRampToValueAtTime(38, time + 0.13);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.19 * velocity, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);
      osc.connect(gain).connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.15);
    }

    function playSnare(time: number, velocity = 1) {
      if (!ctx) return;
      // White noise burst
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.12, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp((-18 * i) / data.length);
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.value = 0.11 * velocity;
      src.connect(gain).connect(ctx.destination);
      src.start(time);
    }

    function playHat(time: number, velocity = 1) {
      if (!ctx) return;
      // Metallic noise burst
      const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp((-45 * i) / data.length);
      }
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.value = 0.045 * velocity;
      src.connect(gain).connect(ctx.destination);
      src.start(time);
    }

    // --- ATMOSPHERIC FX ---
    function playAtmos(time: number) {
      if (!ctx) return;
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.value = 740 + Math.random() * 60;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, time);
      gain.gain.linearRampToValueAtTime(0, time + 2.5);
      osc.connect(gain).connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 2.5);
    }

    // --- SCHEDULER ---
    let beat = 0;
    let chordIdx = 0;
    let nextBarTime = ctx.currentTime + 0.1;

    function scheduleBar(barStart: number) {
      // Chord & sub
      const chord = chords[chordIdx % chords.length];
      playPad(chord, barStart, barDur);
      playSubBass(chord[0], barStart, barDur);

      // Jungle break pattern (16th grid)
      for (let i = 0; i < 16; i++) {
        const t = barStart + i * (beatDur / 4);
        // Kicks: 1, 7, 11, 15 (syncopated)
        if ([0, 6, 10, 14].includes(i)) playKick(t, i === 0 ? 1 : 0.7);
        // Snares: 5, 13 (main); 9 (ghost)
        if ([4, 12].includes(i)) playSnare(t, 1);
        if (i === 8) playSnare(t, 0.4); // ghost snare
        // Hats: shuffled 16ths
        if (jungleShuffle(i)) playHat(t + (i % 2 === 1 ? swing : 0), 0.7);
      }

      // Atmospheric FX every 2 bars
      if (chordIdx % 2 === 0) playAtmos(barStart + Math.random() * 1.5);

      chordIdx++;
    }

    // --- LOOP ---
    let stopped = false;
    function loop() {
      if (stopRef.current || stopped || !ctx) return;
      const now = ctx.currentTime;
      if (now + 0.2 > nextBarTime) {
        scheduleBar(nextBarTime);
        nextBarTime += barDur;
      }
      requestAnimationFrame(loop);
    }
    loop();

    return () => {
      stopped = true;
    };
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return null;
}
