export default function WindowWall() {
  return (
    <group position={[0, 3.5, -12]}>
      {/* LEFT FRAME */}
      <mesh position={[-9.75, 0, 0]}>
        <planeGeometry args={[0.5, 9]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.85}
          metalness={0}
          emissive="#0a0410"
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* RIGHT FRAME */}
      <mesh position={[9.75, 0, 0]}>
        <planeGeometry args={[0.5, 9]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.85}
          metalness={0}
          emissive="#0a0410"
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* TOP FRAME */}
      <mesh position={[0, 4.26, 0]}>
        <planeGeometry args={[19, 0.5]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.85}
          metalness={0}
          emissive="#0a0410"
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* BOTTOM FRAME */}
      <mesh position={[0, -3.26, 0]}>
        <planeGeometry args={[19, 0.5]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.85}
          metalness={0}
          emissive="#0a0410"
          emissiveIntensity={0.04}
        />
      </mesh>
    </group>
  );
}
