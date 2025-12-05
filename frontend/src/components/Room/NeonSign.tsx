import { useMemo, useState } from 'react';
import * as THREE from 'three';
import { useUIStore } from '../../store/uiStore';

type NeonSignProps = {
  text?: string;
  color?: string;
};

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map(c => c + c)
          .join('')
      : h;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r}, ${g}, ${b}`;
}

export default function NeonSign({
  text = 'Nerd By Day\nNerd By Night',
  color = '#6ee7ff',
}: NeonSignProps) {
  const { showTooltip, hideTooltip } = useUIStore();
  const [isOn, setIsOn] = useState(true);
  const [hover, setHover] = useState(false);

  const tex = useMemo(() => {
    // create a canvas sized to content so the resulting texture maps without distortion
    const cvs = document.createElement('canvas');
    const lines = text.split('\n');
    const baseWidth = 1024;

    // font sizing relative to canvas width
    const fontSize = Math.max(48, Math.floor(baseWidth * 0.15));
    const lineHeight = Math.floor(fontSize * 1.08);
    const padding = Math.floor(fontSize * 0.6);

    const cvsWidth = baseWidth;
    const cvsHeight = padding * 2 + lineHeight * lines.length;
    cvs.width = cvsWidth;
    cvs.height = cvsHeight;
    const ctx = cvs.getContext('2d')!;

    // transparent background
    ctx.clearRect(0, 0, cvs.width, cvs.height);

    ctx.font = `italic 300 ${fontSize}px 'Brush Script MT', 'Lucida Handwriting', cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const startY = padding + Math.floor(lineHeight / 2);

    // glow layers for each line (scaled to font size)
    // for (let g = 12; g >= 1; g--) {
    //   ctx.lineWidth = Math.max(1, Math.round(fontSize * 0.02 * g));
    //   ctx.strokeStyle = `rgba(${hexToRgb(color)}, ${0.02 * g})`;
    //   lines.forEach((ln, i) => ctx.strokeText(ln, cvs.width / 2, startY + i * lineHeight));
    // }

    // main stroke and fill
    ctx.lineWidth = Math.max(2, Math.round(fontSize * 0.06));
    ctx.strokeStyle = color;
    lines.forEach((ln, i) => ctx.strokeText(ln, cvs.width / 2, startY + i * lineHeight));
    ctx.fillStyle = color;
    lines.forEach((ln, i) => ctx.fillText(ln, cvs.width / 2, startY + i * lineHeight));

    const tex = new THREE.CanvasTexture(cvs);
    tex.encoding = THREE.sRGBEncoding;
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, [text, color]);

  // plane size (approx) in world units; keep correct aspect from canvas to avoid letter distortion
  const planeWidth = 4;
  // derive planeHeight from the texture aspect ratio
  // read canvas ratio from the texture image if available
  const img = (tex && (tex.image as HTMLCanvasElement)) || null;
  const planeHeight = img ? (img.height / img.width) * planeWidth : 0.72;

  return (
    <group>
      {/* rotate so plane lies flush on the left wall (wall normal faces +X) */}
      <mesh
        rotation={[0, Math.PI / 2, 0]}
        position={[0, 0, 0.02]}
        onPointerOver={(e: any) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
          setHover(true);
          showTooltip(isOn ? 'Turn off neon sign' : 'Turn on neon sign', e.clientX, e.clientY);
        }}
        onPointerMove={(e: any) => {
          showTooltip(isOn ? 'Turn off neon sign' : 'Turn on neon sign', e.clientX, e.clientY);
        }}
        onPointerOut={(e: any) => {
          e.stopPropagation();
          document.body.style.cursor = 'default';
          setHover(false);
          hideTooltip();
        }}
        onClick={(e: any) => {
          e.stopPropagation();
          setIsOn(!isOn);
          hideTooltip();
        }}
      >
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshStandardMaterial
          map={tex}
          color={isOn ? '#ffffff' : '#444444'}
          emissive={isOn ? color : '#333333'}
          emissiveIntensity={isOn ? (hover ? 1.8 : 1.5) : 0.1}
          transparent
        />
      </mesh>
      {/* Multiple point lights to simulate light from the letters */}
      {isOn && (
        <>
          <pointLight color={color} intensity={15} distance={8} position={[-1, 0.3, 0]} />
          <pointLight color={color} intensity={15} distance={8} position={[1, 0.3, 0]} />
          <pointLight color={color} intensity={15} distance={8} position={[0, -0.3, 0]} />
          <pointLight color={color} intensity={20} distance={10} position={[0, 0, 0]} />
        </>
      )}
    </group>
  );
}
