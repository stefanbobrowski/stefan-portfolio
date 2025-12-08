import { useState } from 'react';
import { useUIStore } from '../../store/uiStore';
import type { ThreeElements } from '@react-three/fiber';

type BedProps = ThreeElements['group'] & {
  onBedHover?: (hovering: boolean) => void;
  onBedClick?: () => void;
};

export default function Bed({ onBedHover, onBedClick, ...props }: BedProps) {
  const { showTooltip, hideTooltip } = useUIStore();

  const [blanketHover, setBlanketHover] = useState(false);

  const handlePointerOver = (setter: (val: boolean) => void) => (e: any) => {
    e.stopPropagation();
    setter(true);
    showTooltip('Rest', e.clientX, e.clientY);
    onBedHover?.(true);
  };

  const handlePointerOut = (setter: (val: boolean) => void) => (e: any) => {
    e.stopPropagation();
    setter(false);
    hideTooltip();
    onBedHover?.(false);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    onBedClick?.();
  };

  return (
    <group {...props}>
      {/* Bed frame */}
      <mesh position={[0, 1, 0]} castShadow onClick={handleClick}>
        <boxGeometry args={[8, 1, 6]} />
        <meshStandardMaterial color="#15121f" roughness={0.6} metalness={0.05} />
      </mesh>

      {/* Mattress */}
      <mesh position={[0, 1.62, 0]} onClick={handleClick} castShadow>
        <boxGeometry args={[6.5, 0.5, 5.75]} />
        <meshStandardMaterial color="#d9ccda" roughness={0.9} />
      </mesh>

      {/* Blanket */}
      <mesh
        position={[0, 1.75, 0.63]}
        onPointerOver={handlePointerOver(setBlanketHover)}
        onPointerOut={handlePointerOut(setBlanketHover)}
        onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
          showTooltip(`Rest`, e.clientX, e.clientY);
        }}
        onClick={handleClick}
        castShadow
      >
        <boxGeometry args={[7, 0.5, 4.5]} />
        <meshStandardMaterial
          color="#63325b"
          roughness={0.8}
          emissive={blanketHover ? '#6ee7ff' : '#000000'}
          emissiveIntensity={blanketHover ? 0.25 : 0}
        />
      </mesh>

      {/* Pillow 1 */}
      <mesh position={[-1.75, 2, -2]} castShadow>
        <boxGeometry args={[2, 0.4, 1.4]} />
        <meshStandardMaterial color="#d9ccda" roughness={0.9} />
      </mesh>

      {/* Pillow 2 */}
      <mesh position={[1.5, 2, -2]} castShadow>
        <boxGeometry args={[2, 0.35, 1.3]} />
        <meshStandardMaterial color="#d9ccda" roughness={0.9} />
      </mesh>
    </group>
  );
}
