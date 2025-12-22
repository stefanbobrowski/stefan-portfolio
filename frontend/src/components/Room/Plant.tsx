import { type ThreeElements, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function Plant(props: ThreeElements['group']) {
  const trunkRef = useRef<any>(null);
  const leavesRef = useRef<any>(null);

  const leaves = useMemo(() => {
    const arr = [];
    const numLeaves = 14;
    const baseY = 5.2;
    for (let i = 0; i < numLeaves; i++) {
      const angle = (i / numLeaves) * Math.PI * 2 + (Math.random() - 0.5) * 0.18;
      const radius = 0.45 + Math.random() * 0.13;
      const x = Math.cos(angle) * radius * (0.92 + Math.random() * 0.12);
      const z = Math.sin(angle) * radius * (0.92 + Math.random() * 0.12);
      const y = baseY - 0.18 + Math.random() * 0.28;
      // Clamp r so leaves point up/out, not down (between -0.2 and 0.7 rad)
      const r = angle + (Math.random() - 0.5) * 0.18;
      // Clamp rot so leaves are not upside down (between -0.25 and 0.25 rad)
      const rot = (Math.random() - 0.5) * 0.5;
      const sx = 1.6 + Math.random() * 0.7;
      const sy = 1.7 + Math.random() * 0.8;
      arr.push({ x, y, z, r, sx, sy, rot });
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (trunkRef.current) {
      trunkRef.current.rotation.y = Math.sin(t * 0.25) * 0.018;
      trunkRef.current.rotation.z = Math.cos(t * 0.3) * 0.009;
    }
    if (leavesRef.current) {
      leavesRef.current.children.forEach((c: any, i: number) => {
        c.rotation.z = Math.sin(t * (0.6 + i * 0.15)) * 0.045 + c.userData.baseRot;
        c.rotation.x = Math.cos(t * (0.5 + i * 0.1)) * 0.022;
      });
    }
  });

  return (
    <group {...props}>
      {/* Large ceramic pot */}
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
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.07, 3, 12]} />
          <meshStandardMaterial color="#8b7355" roughness={0.95} />
        </mesh>
        <mesh position={[0, 3, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.06, 3.0, 12]} />
          <meshStandardMaterial color="#9b8365" roughness={0.95} />
        </mesh>
      </group>

      {/* Large fiddle-leaf-fig leaves - wide, tall, slightly wavy */}
      <group ref={leavesRef} position={[0, 0, 0]}>
        {leaves.map((l, i) => {
          const leafShape = useMemo(() => {
            const s = new THREE.Shape();
            s.moveTo(0, 0);
            s.bezierCurveTo(0.3, 0.2, 0.5, 0.8, 0, 1);
            s.bezierCurveTo(-0.5, 0.8, -0.3, 0.2, 0, 0);
            return s;
          }, []);

          const stemPoints = useMemo(
            () => [
              new THREE.Vector3(0, -0.1, 0.01),
              new THREE.Vector3(0, 0.7, 0.01),
              new THREE.Vector3(0, 1, 0.01),
            ],
            []
          );

          const veinPoints = useMemo(
            () => [
              [new THREE.Vector3(0, 0.2, 0.01), new THREE.Vector3(0.18, 0.45, 0.01)],
              [new THREE.Vector3(0, 0.4, 0.01), new THREE.Vector3(-0.16, 0.65, 0.01)],
              [new THREE.Vector3(0, 0.6, 0.01), new THREE.Vector3(0.13, 0.85, 0.01)],
              [new THREE.Vector3(0, 0.8, 0.01), new THREE.Vector3(-0.1, 0.97, 0.01)],
            ],
            []
          );

          return (
            <group
              key={i}
              position={[l.x, l.y, l.z]}
              rotation={[0.1, l.rot, l.r]}
              scale={[l.sx, l.sy, 1]}
              castShadow
              userData={{ baseRot: l.r }}
            >
              {/* Leaf shape */}
              <mesh>
                <shapeGeometry args={[leafShape, 32]} />
                <meshStandardMaterial
                  color={`hsl(${110 + i * 8}, 58%, ${28 - i * 1.5}%)`}
                  roughness={0.65}
                  metalness={0.01}
                  side={THREE.DoubleSide}
                />
              </mesh>
              {/* Main stem (center vein) */}
              <line>
                <bufferGeometry>
                  <bufferAttribute
                    attach="attributes-position"
                    count={stemPoints.length}
                    array={new Float32Array(stemPoints.flatMap(p => [p.x, p.y, p.z]))}
                    itemSize={3}
                  />
                </bufferGeometry>
                <lineBasicMaterial color="#b6a97a" linewidth={2} />
              </line>
              {/* Side veins */}
              {veinPoints.map((pts, vi) => (
                <line key={vi}>
                  <bufferGeometry>
                    <bufferAttribute
                      attach="attributes-position"
                      count={pts.length}
                      array={new Float32Array(pts.flatMap(p => [p.x, p.y, p.z]))}
                      itemSize={3}
                    />
                  </bufferGeometry>
                  <lineBasicMaterial color="#d8cfa3" linewidth={1} />
                </line>
              ))}
            </group>
          );
        })}
      </group>
    </group>
  );
}
