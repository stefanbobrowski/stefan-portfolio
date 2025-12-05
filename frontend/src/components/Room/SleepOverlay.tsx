import React, { useEffect, useState } from 'react';
import { useUIStore } from '../../store/uiStore';

export default function SleepOverlay() {
  const isSleeping = useUIStore(state => state.isSleeping);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isSleeping) setVisible(true);
    else {
      // allow fade-out before hiding
      const t = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(t);
    }
  }, [isSleeping]);

  if (!visible && !isSleeping) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: isSleeping ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        pointerEvents: isSleeping ? 'auto' : 'none',
        transition: 'background 350ms ease',
      }}
    >
      <div
        style={{
          color: '#fff',
          fontSize: 140,
          fontWeight: 700,
          opacity: isSleeping ? 1 : 0,
          transition: 'opacity 350ms ease',
          userSelect: 'none',
        }}
      >
        ZZZ
      </div>
    </div>
  );
}
