import { useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { useUIStore } from '../../store/uiStore';

type LightSwitchProps = {
  position?: [number, number, number];
};

export default function LightSwitch({ position = [9.8, 5.2, 4] }: LightSwitchProps) {
  const { lampOn, toggleLamp, showTooltip, hideTooltip } = useUIStore();
  // @ts-expect-error: three-fiber Mesh typing interop — allow using THREE.Mesh for refs
  const switchRef = useRef<THREE.Mesh>(null);
  const audioRef = useRef<AudioContext | null>(null);

  const playToggleSound = (nextOn: boolean) => {
    try {
      type Win = Window & {
        AudioContext?: typeof AudioContext;
        webkitAudioContext?: typeof AudioContext;
      };
      const Ctor = (window as Win).AudioContext ?? (window as Win).webkitAudioContext;
      if (!Ctor) return;
      if (!audioRef.current) audioRef.current = new Ctor();
      const ctx = audioRef.current as AudioContext;
      if (!ctx) return;
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
      console.log('Audio error in LightSwitch toggle sound:', e);
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
          (e as ThreeEvent<PointerEvent>).clientX,
          (e as ThreeEvent<PointerEvent>).clientY
        );
      }}
      onPointerMove={(e: ThreeEvent<PointerEvent>) => {
        showTooltip(
          lampOn ? 'Turn off light' : 'Turn on light',
          (e as ThreeEvent<PointerEvent>).clientX,
          (e as ThreeEvent<PointerEvent>).clientY
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
      <pointLight position={[-0.05, 0, 0.06]} intensity={1.2} color="#ffd7b2" distance={1.5} />

      {/* Emissive backing to catch light better */}
      <mesh position={[0, 0, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 0.35, 0.02]} />
        <meshStandardMaterial color="#222" emissive="#444" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}
