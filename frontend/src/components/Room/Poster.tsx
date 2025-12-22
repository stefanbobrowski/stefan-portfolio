import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useUIStore } from '../../store/uiStore';

type PosterProps = {
  imageUrl: string;
  width?: number;
  height?: number;
  title?: string;
};

export default function Poster({ imageUrl, width = 3, height = 4, title = '' }: PosterProps) {
  const texture = useLoader(THREE.TextureLoader, imageUrl);
  const { showTooltip, hideTooltip } = useUIStore();

  return (
    <group>
      {/* rotate so plane lies flush on the left wall (wall normal faces +X) */}
      <mesh
        rotation={[0, Math.PI / 2, 0]}
        position={[0, 0, 0.02]}
        onPointerOver={(e: React.PointerEvent<HTMLElement>) => {
          document.body.style.cursor = 'pointer';
          showTooltip(title, e.clientX, e.clientY);
        }}
        onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
          showTooltip(title, e.clientX, e.clientY);
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
          hideTooltip();
        }}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
