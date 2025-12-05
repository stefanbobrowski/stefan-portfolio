import { useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function Rug() {
  const rugRef = useRef<any>(null);

  const canvasTexture = useMemo(() => {
    const w = 512;
    const h = 512;
    const cvs = document.createElement('canvas');
    cvs.width = w;
    cvs.height = h;
    const ctx = cvs.getContext('2d')!;

    // Deep purple base
    ctx.fillStyle = '#2a1f3d';
    ctx.fillRect(0, 0, w, h);

    // Ornate border pattern
    ctx.strokeStyle = '#6ee7ff';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, w - 40, h - 40);
    ctx.strokeRect(28, 28, w - 56, h - 56);

    // Geometric center medallion
    ctx.save();
    ctx.translate(w / 2, h / 2);

    // Outer circle
    ctx.strokeStyle = '#ff9adf';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 140, 0, Math.PI * 2);
    ctx.stroke();

    // Inner geometric pattern
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8;
      ctx.save();
      ctx.rotate(angle);

      // Radiating lines
      ctx.strokeStyle = '#4a3f5a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 140);
      ctx.stroke();

      // Decorative elements
      ctx.fillStyle = '#6ee7ff';
      ctx.fillRect(-8, 100, 16, 20);

      ctx.restore();
    }

    // Center circle
    ctx.fillStyle = '#ff77cc';
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Corner decorations
    const corners = [
      [60, 60],
      [w - 60, 60],
      [60, h - 60],
      [w - 60, h - 60],
    ];

    corners.forEach(([x, y]) => {
      ctx.fillStyle = '#6ee7ff';
      ctx.fillRect(x - 10, y - 10, 20, 20);
      ctx.strokeStyle = '#ff9adf';
      ctx.lineWidth = 2;
      ctx.strokeRect(x - 15, y - 15, 30, 30);
    });

    const tex = new THREE.CanvasTexture(cvs);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(1, 1);
    tex.anisotropy = 8;
    tex.needsUpdate = true;
    return tex;
  }, []);

  return (
    <mesh
      ref={rugRef}
      position={[0, 0.012, -1.5]} // centered slightly under desk
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[12, 9]} />
      <meshStandardMaterial map={canvasTexture} roughness={0.95} metalness={0.02} />
    </mesh>
  );
}
