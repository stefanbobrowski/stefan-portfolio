import { useEffect, useState, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useUIStore } from '../../store/uiStore';
import DesktopWindow from './DesktopWindow';

export default function Desk() {
  const { showTooltip, hideTooltip, openModal } = useUIStore();

  const desktopSound = useRef<HTMLAudioElement | null>(null);
  const monitorSound = useRef<HTMLAudioElement | null>(null);

  const [pcHover, setPcHover] = useState(false);
  const [monitor1Hover, setMonitor1Hover] = useState(false);

  const monitorTex = useMemo(() => {
    const w = 512;
    const h = 300;
    const cvs = document.createElement('canvas');
    cvs.width = w;
    cvs.height = h;
    const ctx = cvs.getContext('2d')!;

    // background (navy)
    ctx.fillStyle = '#041028';
    ctx.fillRect(0, 0, w, h);

    // top bar
    ctx.fillStyle = '#071427';
    ctx.fillRect(0, 0, w, 36);

    // logo circle
    ctx.beginPath();
    ctx.fillStyle = '#2dd6ff';
    ctx.arc(28, 18, 8, 0, Math.PI * 2);
    ctx.fill();

    // StefanOS text
    ctx.fillStyle = '#cfefff';
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('StefanOS', 44, 23);

    // small dock icons at bottom
    const iconY = h - 28;
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = `rgba(255,255,255,${0.06 + i * 0.08})`;
      ctx.fillRect(40 + i * 28, iconY, 18, 18);
    }

    const tex = new THREE.CanvasTexture(cvs);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);

  useEffect(() => {
    desktopSound.current = new Audio('/click-1.mp3');
    desktopSound.current.volume = 0.6;

    monitorSound.current = new Audio('/click-2.mp3');
    monitorSound.current.volume = 0.6;
  }, []);

  return (
    <group position={[0, 0, -2.5]}>
      {/* Desk Top */}
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.5, 0.2, 3]} />
        <meshStandardMaterial color="#15121f" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Desk Legs */}
      <mesh position={[-2.4, 0.55, 0.8]} castShadow>
        <boxGeometry args={[0.2, 3.2, 0.2]} />
        <meshStandardMaterial color="#101019" />
      </mesh>
      <mesh position={[2.4, 0.55, 0.8]} castShadow>
        <boxGeometry args={[0.2, 3.2, 0.2]} />
        <meshStandardMaterial color="#101019" />
      </mesh>
      <mesh position={[-2.4, 0.55, -0.8]} castShadow>
        <boxGeometry args={[0.2, 3.2, 0.2]} />
        <meshStandardMaterial color="#101019" />
      </mesh>
      <mesh position={[2.4, 0.55, -0.8]} castShadow>
        <boxGeometry args={[0.2, 3.2, 0.2]} />
        <meshStandardMaterial color="#101019" />
      </mesh>

      {/* Monitor 1 */}
      <group position={[0, 2.2, -0.7]}>
        {/* Screen */}
        <mesh
          position={[0, 1.125, 0]}
          castShadow
          onPointerOver={(e: React.PointerEvent<HTMLElement>) => {
            document.body.style.cursor = 'pointer';
            setMonitor1Hover(true);
            showTooltip(`Login to Stefan OS`, e.clientX, e.clientY);
          }}
          onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
            showTooltip(`Login to Stefan OS`, e.clientX, e.clientY);
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
            setMonitor1Hover(false);
            hideTooltip();
          }}
          onClick={() => {
            hideTooltip();
            openModal(<DesktopWindow />);
            if (monitorSound.current) monitorSound.current.play();
          }}
        >
          <planeGeometry args={[2.9, 1.5]} />
          <meshStandardMaterial
            emissive={monitor1Hover ? '#0a1a2e' : '#000000'}
            emissiveIntensity={monitor1Hover ? 0.3 : 0}
            map={monitorTex}
            toneMapped={false}
          />
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
      <mesh
        position={[-1.79, 0.87, 0.3]}
        castShadow
        onPointerOver={(e: React.PointerEvent<HTMLElement>) => {
          document.body.style.cursor = 'pointer';
          setPcHover(true);
          showTooltip(`Stefan's PC`, e.clientX, e.clientY);
        }}
        onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
          showTooltip(`Stefan's PC`, e.clientX, e.clientY);
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
          setPcHover(false);
          hideTooltip();
        }}
        onClick={() => {
          hideTooltip();
          openModal(
            <div>
              <h2>Stefan's PC Specs</h2>
              <ul>
                <li>CPU: AMD Ryzen 7 5800X 3.80GHz</li>
                <li>GPU: NVIDIA GeForce RTX 3070 Ti</li>
                <li>RAM: 32GB DDR4 3200 RGB</li>
              </ul>
              SteelSeries Apex 3 RGB Gaming Keyboard Audeze Maxwell Wireless Gaming Headset Skytech
              Chronos Gaming PC Desktop CPU: AMD Ryzen 7 5800X 3.80GHz GPU: NVIDIA GeForce RTX 3070
              Ti RAM: 32GB DDR4 3200 RGB Monitor: Sceptre 34-Inch Curved Ultrawide - 3440 x Mouse:
              Logitech G PRO X SUPERLIGHT
            </div>
          );
          if (desktopSound.current) desktopSound.current.play();
        }}
      >
        <boxGeometry args={[0.825, 1.75, 2]} />
        <meshStandardMaterial
          color="#07080a"
          emissive={pcHover ? '#ffb86b' : '#041229'}
          emissiveIntensity={pcHover ? 0.6 : 0.12}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Keyboard */}
      <mesh position={[-0.7, 2.35, 0.5]} castShadow>
        <boxGeometry args={[1.8, 0.06, 0.7]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Mouse */}
      <group position={[0.9, 2.35, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.36, 0.12, 0.6]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.4} metalness={0.05} />
        </mesh>
        {/* Scroll wheel */}
        <mesh position={[0, 0.065, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.05, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
        </mesh>
      </group>

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
