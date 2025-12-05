import { type ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function Plant(props: ThreeElements['group']) {
  const trunkRef = useRef<any>(null);
  const leavesRef = useRef<any>(null);

  // Create tall, wavy leaves characteristic of a Fiddle Leaf Fig
  const leaves = useMemo(() => {
    return [
      { x: 0.4, y: 3.2, z: 0.15, r: -0.5, sx: 2.2, sy: 2.4, rot: 0 },
      { x: -0.35, y: 2.85, z: -0.2, r: 0.45, sx: 2.0, sy: 2.3, rot: Math.PI / 6 },
      { x: 0.5, y: 2.4, z: 0.25, r: -0.35, sx: 1.95, sy: 2.2, rot: -Math.PI / 8 },
      { x: -0.3, y: 1.95, z: -0.15, r: 0.5, sx: 1.85, sy: 2.0, rot: Math.PI / 5 },
      { x: 0.35, y: 1.5, z: 0.1, r: -0.25, sx: 1.7, sy: 1.85, rot: -Math.PI / 230 },
      { x: -0.4, y: 1.0, z: -0.2, r: 0.4, sx: 1.5, sy: 1.7, rot: Math.PI / 4 },
    ];
  }, []);

  // Gentle sway for the whole plant
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (trunkRef.current) {
      trunkRef.current.rotation.y = Math.sin(t * 0.25) * 0.04;
      trunkRef.current.rotation.z = Math.cos(t * 0.3) * 0.02;
    }
    if (leavesRef.current) {
      leavesRef.current.children.forEach((c: any, i: number) => {
        c.rotation.z = Math.sin(t * (0.6 + i * 0.15)) * 0.1 + c.userData.baseRot;
        c.rotation.x = Math.cos(t * (0.5 + i * 0.1)) * 0.05;
      });
    }
  });

  return (
    <group {...props}>
      {/* Large ceramic pot - wider/taller for fiddle leaf fig */}
      <mesh position={[0, 0.69, 0]} castShadow>
        <cylinderGeometry args={[1.25, 0.95, 2, 16]} />
        <meshStandardMaterial color="#9b8674" roughness={0.88} metalness={0.02} />
      </mesh>

      {/* Dark soil visible at top */}
      <mesh position={[0, 1.65, 0]}>
        <cylinderGeometry args={[1, 1, 0.1, 24]} />
        <meshStandardMaterial color="#1f1b15" roughness={1} />
      </mesh>

      {/* Thin wooden trunk segments */}
      <group ref={trunkRef} position={[0, 2.28, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 3, 12]} />
          <meshStandardMaterial color="#8b7355" roughness={0.95} />
        </mesh>
        <mesh position={[0, 3, 0]}>
          <cylinderGeometry args={[0.045, 0.06, 3.0, 12]} />
          <meshStandardMaterial color="#9b8365" roughness={0.95} />
        </mesh>
      </group>

      {/* Large fiddle-leaf-fig leaves - wide, tall, slightly wavy */}
      <group ref={leavesRef} position={[0, 4, 0]}>
        {leaves.map((l, i) => (
          <mesh
            key={i}
            position={[l.x, l.y - 1, l.z]}
            rotation={[0.1, l.rot, l.r]}
            scale={[l.sx, l.sy, 1]}
            castShadow
            userData={{ baseRot: l.r }}
          >
            {/* Wide, tall leaf shape with gentle curves */}
            <planeGeometry args={[1, 1, 4, 6]} />
            <meshStandardMaterial
              color={`hsl(${110 + i * 8}, 58%, ${28 - i * 1.5}%)`}
              roughness={0.65}
              metalness={0.01}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
