import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useRef, useEffect } from 'react';

export function OrbitControls() {
  const { camera, gl } = useThree();
  const controls = useRef<OrbitControlsImpl | null>(null);

  useFrame(() => controls.current?.update());

  useEffect(() => {
    controls.current = new OrbitControlsImpl(camera, gl.domElement);
    return () => controls.current?.dispose();
  }, [camera, gl]);

  return null;
}
