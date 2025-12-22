import React, { useRef, useEffect, useState } from 'react';
// simple fixed lamp (no swinging)
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { useEffect as useEff } from 'react';
import { useUIStore } from '../../store/uiStore';

// Sound function copied from LightSwitch
const playToggleSound = (nextOn: boolean) => {
  try {
    const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    if (!(window as any)._lampAudioCtx) (window as any)._lampAudioCtx = new AudioCtx();
    const ctx = (window as any)._lampAudioCtx;
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
  const lightRef = useRef<any>(null);

  // Ensure RectAreaLight uniforms are injected
  RectAreaLightUniformsLib.init();

  useEff(() => {
    if (lightRef.current) lightRef.current.rotation.x = -Math.PI / 2;
  }, []);

  useEffect(() => {
    if (lightRef.current) lightRef.current.intensity = lampOn ? intensity : 0;
  }, [lampOn, intensity]);

  const tooltipText = 'Light';

  const handlePointerOver = (e: any) => {
    setHovered(true);
    // Get screen position for tooltip (fallback to center if not available)
    const x = e?.clientX || window.innerWidth / 2;
    const y = e?.clientY || window.innerHeight / 2;
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
