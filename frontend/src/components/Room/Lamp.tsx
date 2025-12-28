import { useRef, useEffect, useState } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
// simple fixed lamp (no swinging)
import { RectAreaLightUniformsLib } from 'three-stdlib';
import { useUIStore } from '../../store/uiStore';

// Sound function copied from LightSwitch
const playToggleSound = (nextOn: boolean) => {
  try {
    type Win = Window & {
      AudioContext?: typeof AudioContext;
      webkitAudioContext?: typeof AudioContext;
      _lampAudioCtx?: AudioContext;
    };
    const Ctor = (window as Win).AudioContext ?? (window as Win).webkitAudioContext;
    if (!Ctor) return;
    if (!(window as Win)._lampAudioCtx) (window as Win)._lampAudioCtx = new Ctor();
    const ctx = (window as Win)._lampAudioCtx;
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
    console.log('Audio error in Lamp toggle sound:', e);
  }
};

type LampProps = {
  position?: [number, number, number];
  color?: string;
  intensity?: number;
  width?: number;
  height?: number;
};

export default function Lamp({
  position = [0, 7.8, 0],
  color = '#c89860',
  intensity = 7,
  width = 11,
  height = 11,
}: LampProps) {
  const { lampOn, toggleLamp, showTooltip, hideTooltip } = useUIStore();
  const [hovered, setHovered] = useState(false);
  // @ts-expect-error: three-fiber RectAreaLight typing interop — allow using THREE.RectAreaLight for refs
  const lightRef = useRef<THREE.RectAreaLight | null>(null);

  // Ensure RectAreaLight uniforms are injected
  RectAreaLightUniformsLib.init();

  useEffect(() => {
    if (lightRef.current) lightRef.current.rotation.x = -Math.PI / 2;
  }, []);

  useEffect(() => {
    if (lightRef.current) lightRef.current.intensity = lampOn ? intensity : 0;
  }, [lampOn, intensity]);

  const tooltipText = 'Light';

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    setHovered(true);
    // Get screen position for tooltip (fallback to center if not available)
    const x = (e as ThreeEvent<PointerEvent>).clientX ?? window.innerWidth / 2;
    const y = (e as ThreeEvent<PointerEvent>).clientY ?? window.innerHeight / 2;
    showTooltip(tooltipText, x, y);
    document.body.style.cursor = 'pointer';
  };
  const handlePointerOut = () => {
    setHovered(false);
    hideTooltip();
    document.body.style.cursor = '';
  };

  const handleLampClick = () => {
    const next = !lampOn;
    toggleLamp();
    playToggleSound(next);
  };

  return (
    <group
      position={position}
      onClick={handleLampClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Short pole that doesn't protrude below the lamp head */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.9]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* Lamp head attached close to ceiling (bottom of pole) */}
      <mesh position={[0, -0.5, 0]} castShadow>
        <boxGeometry args={[0.6, 0.18, 0.6]} />
        <meshStandardMaterial
          color="#111111"
          emissive={color}
          emissiveIntensity={lampOn ? (hovered ? 1.7 : 1.2) : hovered ? 0.18 : 0.02}
          metalness={0.25}
          roughness={0.35}
        />
      </mesh>

      {/* Rectangular area light shining downwards from the head */}
      <rectAreaLight
        ref={lightRef}
        args={[color, intensity, width, height]}
        position={[0, -0.5, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  );
}
