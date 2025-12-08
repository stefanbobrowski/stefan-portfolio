import React, { useRef, useEffect, useState } from 'react';
// simple fixed lamp (no swinging)
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { useEffect as useEff } from 'react';
import { useUIStore } from '../../store/uiStore';

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

  // Handlers for hover
  const handlePointerOver = (e: any) => {
    setHovered(true);
    // Get screen position for tooltip (fallback to center if not available)
    const x = e?.clientX || window.innerWidth / 2;
    const y = e?.clientY || window.innerHeight / 2;
    showTooltip(tooltipText, x, y);
    // Change cursor
    document.body.style.cursor = 'pointer';
  };
  const handlePointerOut = () => {
    setHovered(false);
    hideTooltip();
    document.body.style.cursor = '';
  };

  return (
    <group
      position={position}
      onClick={toggleLamp}
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
