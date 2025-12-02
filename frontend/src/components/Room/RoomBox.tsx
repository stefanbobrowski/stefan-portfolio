import WindowWall from './WindowWall';
import Desk from './Desk';
import Rug from './Rug';

export default function RoomBox() {
  return (
    <group>
      {/* FLOOR (20 x 24) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 24]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.85}
          metalness={0}
          emissive="#05030a"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* BACK WALL + WINDOW FRAME */}
      <WindowWall />

      {/* LEFT WALL (matches depth of room) */}
      <mesh position={[-10, 6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[24, 12]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.85}
          metalness={0}
          emissive="#05030a"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* RIGHT WALL */}
      <mesh position={[10, 6, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[24, 12]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.85}
          metalness={0}
          emissive="#05030a"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* CEILING (match floor size) */}
      <mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 24]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.9}
          metalness={0}
          emissive="#05030a"
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* Desk + PC */}
      <Desk />
      <Rug />
    </group>
  );
}
