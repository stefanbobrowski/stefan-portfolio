import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

type PosterProps = {
  imageUrl: string;
  width?: number;
  height?: number;
};

export default function Poster({ imageUrl, width = 3, height = 4 }: PosterProps) {
  const texture = useLoader(THREE.TextureLoader, imageUrl);

  return (
    <group>
      {/* rotate so plane lies flush on the left wall (wall normal faces +X) */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0.02]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </group>
  );
}
