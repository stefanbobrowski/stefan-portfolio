export default function Desk() {
  const handleMonitorClick = () => {
    window.open('https://stefanbobrowski.com', '_blank'); // or your portfolio URL
  };

  return (
    <group position={[0, 0, -2.5]}>
      {/* Desk Top */}
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 0.2, 2]} />
        <meshStandardMaterial color="#15121f" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Desk Legs */}
      <mesh position={[-2.8, 0.55, 0.8]} castShadow>
        <boxGeometry args={[0.2, 3.2, 0.2]} />
        <meshStandardMaterial color="#101019" />
      </mesh>
      <mesh position={[2.8, 0.55, 0.8]} castShadow>
        <boxGeometry args={[0.2, 3.2, 0.2]} />
        <meshStandardMaterial color="#101019" />
      </mesh>
      <mesh position={[-2.8, 0.55, -0.8]} castShadow>
        <boxGeometry args={[0.2, 3.2, 0.2]} />
        <meshStandardMaterial color="#101019" />
      </mesh>
      <mesh position={[2.8, 0.55, -0.8]} castShadow>
        <boxGeometry args={[0.2, 3.2, 0.2]} />
        <meshStandardMaterial color="#101019" />
      </mesh>

      {/* Monitor */}
      <group position={[0, 2.2, -0.7]}>
        {/* Screen */}
        <mesh
          position={[0, 1.125, 0]}
          onClick={handleMonitorClick}
          onPointerOver={() => (document.body.style.cursor = 'pointer')}
          onPointerOut={() => (document.body.style.cursor = 'default')}
          castShadow
        >
          <planeGeometry args={[2.6, 1.5]} />
          <meshStandardMaterial color="#050608" emissive="#2dd6ff" emissiveIntensity={1.2} />
        </mesh>
        {/* Stand */}
        <mesh position={[0, 0.5, -0.1]} castShadow>
          <boxGeometry args={[0.15, 0.6, 0.15]} />
          <meshStandardMaterial color="#151521" />
        </mesh>
        {/* Base */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[1, 0.1, 0.5]} />
          <meshStandardMaterial color="#151521" />
        </mesh>
      </group>

      {/* PC Tower with RGB front strip */}
      <mesh position={[-2.2, 1.0, 0.6]} castShadow>
        <boxGeometry args={[0.8, 2, 0.9]} />
        <meshStandardMaterial color="#05040a" emissive="#00e5ff" emissiveIntensity={0.1} />
      </mesh>

      {/* Keyboard */}
      <mesh position={[-0.7, 2.33, 0.5]} castShadow>
        <boxGeometry args={[1.8, 0.06, 0.7]} />
        <meshStandardMaterial color="#111018" emissive="#33ffcc" emissiveIntensity={0.2} />
      </mesh>

      {/* Under-desk RGB strip */}
      {/* <mesh position={[0, 0.8, 1]}>
        <boxGeometry args={[5.6, 0.05, 0.05]} />
        <meshStandardMaterial color="#020910" emissive="#00f5ff" emissiveIntensity={1.5} />
      </mesh> */}

      {/* Wall neon strips (left/right) */}
      {/* <mesh position={[-9.8, 2.5, -2]}>
        <boxGeometry args={[0.08, 3, 0.08]} />
        <meshStandardMaterial color="#200020" emissive="#ff33ff" emissiveIntensity={1.3} />
      </mesh>
      <mesh position={[9.8, 2.5, -2]}>
        <boxGeometry args={[0.08, 3, 0.08]} />
        <meshStandardMaterial color="#200020" emissive="#33aaff" emissiveIntensity={1.3} />
      </mesh> */}

      {/* Ceiling strip near window */}
      {/* <mesh position={[0, 6.9, -4]}>
        <boxGeometry args={[10, 0.08, 0.08]} />
        <meshStandardMaterial color="#200020" emissive="#ff66ff" emissiveIntensity={1.2} />
      </mesh> */}
    </group>
  );
}
