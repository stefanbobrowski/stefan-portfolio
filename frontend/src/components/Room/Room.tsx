import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import CityBackground from './CityBackground';
import RoomBox from './RoomBox';

import styles from './Room.module.scss';

// Needed for RectAreaLight
RectAreaLightUniformsLib.init();

export default function Room() {
  const controls = useRef<OrbitControlsImpl | null>(null);
  return (
    <div className={styles.roomContainer}>
      <Canvas
        shadows
        camera={{
          position: [-0.5, 6, 12],
          fov: 40,
        }}
      >
        {/* Soft overall fill tying the room together */}
        <hemisphereLight intensity={0.55} skyColor={'#ff77cc'} groundColor={'#2d0f3a'} />
        {/* Gentle directional from the window side */}
        <directionalLight intensity={0.8} position={[0, 6, -12]} color="#ff9adf" castShadow />
        <CityBackground />
        <RoomBox />
        <OrbitControls
          ref={controls}
          onChange={() => {
            const ctrl = controls.current;
            if (!ctrl) return; // null guard

            const cam = ctrl.object; // <-- TS now knows this is a Camera
            if (cam.position.y < 2.4) cam.position.y = 2.4;
          }}
          enableDamping
          dampingFactor={0.08}
          target={[0, 4.2, 3]}
          minDistance={7}
          maxDistance={18}
          rotateSpeed={0.45}
          zoomSpeed={0.5}
          panSpeed={0.3}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.9}
          minAzimuthAngle={-(Math.PI / 6)}
          maxAzimuthAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
}
