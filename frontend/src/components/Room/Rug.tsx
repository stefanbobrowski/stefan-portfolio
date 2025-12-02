import { Mesh } from 'three';
import { useRef } from 'react';

export default function Rug() {
  const rugRef = useRef(null);

  return (
    <mesh
      ref={rugRef}
      position={[0, 0.01, -1.5]} // centered slightly under desk
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[12, 9]} />
      <meshStandardMaterial
        color="#4f4c77"
        roughness={0.9}
        metalness={0.1}
        // emissive="#ad7e27ff"
        // emissiveIntensity={0.15}
      />
    </mesh>
  );
}
