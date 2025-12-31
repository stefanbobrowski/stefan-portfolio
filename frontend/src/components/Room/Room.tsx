import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { RectAreaLightUniformsLib } from 'three-stdlib';
import CityBackground from './CityBackground';
import RoomBox from './RoomBox';
import Tooltip from '../UI/Tooltip/Tooltip';
import Modal from '../UI/Modal/Modal';
import SleepOverlay from './SleepOverlay';
import styles from './Room.module.scss';

// Needed for RectAreaLight
RectAreaLightUniformsLib.init();

export default function Room() {
  const controls = useRef<OrbitControlsImpl | null>(null);

  return (
    <div className={styles.roomContainer}>
      {/* <RoomMusicToggle /> */}
      <Canvas
        shadows
        camera={{
          position: [0, 6, 12.2],
          fov: 40,
        }}
      >
        <hemisphereLight intensity={0.6} skyColor={'#ff77cc'} groundColor={'#2d0f3a'} />
        <directionalLight
          intensity={0.8}
          position={[0, 6, -12]}
          color="#ff9adf"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-bias={-0.0001}
        />
        <CityBackground />
        <RoomBox />
        <OrbitControls
          ref={controls}
          onChange={() => {
            const ctrl = controls.current;
            if (!ctrl) return;
            const cam = ctrl.object;
            if (cam.position.y < 2.4) cam.position.y = 2.4;
          }}
          enableDamping
          dampingFactor={0.08}
          target={[0, 4.2, 3]}
          minDistance={7}
          maxDistance={18}
          rotateSpeed={0.45}
          enableZoom={false}
          enablePan={false}
          mouseButtons={{
            LEFT: 2,
            MIDDLE: 0,
            RIGHT: 0,
          }}
          minPolarAngle={Math.PI / 2.8}
          maxPolarAngle={Math.PI / 1.9}
          minAzimuthAngle={-(Math.PI / 6)}
          maxAzimuthAngle={Math.PI / 6}
        />
      </Canvas>
      <Tooltip />
      <Modal />
      <SleepOverlay />
    </div>
  );
}
