import { useRef } from 'react';
import { useTexture } from '@react-three/drei';

import * as THREE from 'three';

export default function CityBackground() {
  const tex = useTexture('/city.jpg');
  const meshRef = useRef(null);

  const radius = 450;
  const height = 300;
  const arc = Math.PI * 0.45;

  return (
    <mesh ref={meshRef} position={[0, 40, 125]} rotation={[0, Math.PI, 0]}>
      <cylinderGeometry
        args={[
          radius,
          radius,
          height,
          128,
          1,
          true,
          -arc / 2, // center
          arc,
        ]}
      />
      <meshBasicMaterial map={tex} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}
