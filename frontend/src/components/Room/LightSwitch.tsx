import { useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { useUIStore } from '../../store/uiStore';

type LightSwitchProps = {
  position?: [number, number, number];
};

export default function LightSwitch({ position = [9.8, 5.2, 4] }: LightSwitchProps) {
  const { lampOn, toggleLamp, showTooltip, hideTooltip } = useUIStore();
  const switchRef = useRef<any>(null);
  const audioRef = useRef<any>(null);

  const playToggleSound = (nextOn: boolean) => {
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioRef.current) audioRef.current = new AudioCtx();
      const ctx = audioRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = nextOn ? 900 : 420;
      g.gain.setValueAtTime(0.0001, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.14);
    } catch (e) {
      // ignore audio errors
    }
  };

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const next = !lampOn;
    toggleLamp();
    playToggleSound(next);
  };

  return (
    <group
      position={position}
      rotation={[0, Math.PI / -2, 0]}
      onPointerDown={handleClick}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        document.body.style.cursor = 'pointer';
        showTooltip(
          lampOn ? 'Turn off light' : 'Turn on light',
          (e as any).clientX,
          (e as any).clientY
        );
      }}
      onPointerMove={(e: ThreeEvent<PointerEvent>) => {
        showTooltip(
          lampOn ? 'Turn off light' : 'Turn on light',
          (e as any).clientX,
          (e as any).clientY
        );
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        hideTooltip();
      }}
    >
      {/* Switch plate backing */}
      <mesh position={[0, 0, 0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.15, 0.04]} />
        <meshStandardMaterial color="#1a2535" metalness={0.1} roughness={0.3} />
      </mesh>

      {/* Toggle switch (the actual movable part) */}
      <mesh ref={switchRef} position={[0, lampOn ? 0.035 : -0.035, 0.035]} castShadow>
        <boxGeometry args={[0.035, 0.055, 0.015]} />
        <meshStandardMaterial
          color={lampOn ? '#ffd27a' : '#444'}
          emissive={lampOn ? '#aa8844' : '#222'}
          emissiveIntensity={lampOn ? 0.15 : 0.05}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>

      {/* Accent light to make the switch more visible on dark wall */}
      {/* Subtle accent light (soft, not overpowering) */}
      <pointLight position={[-0.05, 0, 0.06]} intensity={1.2} color="#ffd7b2" distance={1.5} />

      {/* Emissive backing to catch light better */}
      <mesh position={[0, 0, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 0.35, 0.02]} />
        <meshStandardMaterial color="#222" emissive="#444" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
