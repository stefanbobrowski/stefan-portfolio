import React, { useRef, useEffect } from 'react';
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
  const { lampOn } = useUIStore();
  const lightRef = useRef<any>(null);

  // Ensure RectAreaLight uniforms are injected
  RectAreaLightUniformsLib.init();

  useEff(() => {
    if (lightRef.current) lightRef.current.rotation.x = -Math.PI / 2;
  }, []);

  useEffect(() => {
    if (lightRef.current) lightRef.current.intensity = lampOn ? intensity : 0;
  }, [lampOn, intensity]);

  return (
    <group position={position}>
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
          emissiveIntensity={lampOn ? 1.2 : 0.02}
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
