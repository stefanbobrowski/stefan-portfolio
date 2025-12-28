import WindowWall from './WindowWall';
import Desk from './Desk';
import Rug from './Rug';
import Plant from './Plant';
import Bed from './Bed';
import RestModal from './RestModal';
import { useUIStore } from '../../store/uiStore';
import Lamp from './Lamp';
import LightSwitch from './LightSwitch';
import Cat from './Cat';
import NeonSign from './NeonSign';
import Poster from './Poster';
import BookShelf from './BookShelf';

export default function RoomBox() {
  return (
    <group>
      {/* FLOOR */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 24]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.85}
          metalness={0}
          emissive="#05030a"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* BACK WALL + WINDOW FRAME */}
      <WindowWall />

      {/* LEFT WALL */}
      <mesh position={[-10, 6, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[24, 12]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.85}
          metalness={0}
          emissive="#05030a"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* RIGHT WALL */}
      <mesh position={[10, 6, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[24, 12]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.85}
          metalness={0}
          emissive="#05030a"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* CEILING */}
      <mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 24]} />
        <meshStandardMaterial
          color="#0f1a25"
          roughness={0.9}
          metalness={0}
          emissive="#05030a"
          emissiveIntensity={0.04}
        />
      </mesh>

      <Desk />
      <Rug />
      <Plant position={[7.5, 0, -9]} />

      <group position={[-7, -0.47, -7.5]} rotation={[0, Math.PI / 2, 0]}>
        <Bed
          onBedHover={hovering => {
            if (hovering) {
              document.body.style.cursor = 'pointer';
            } else {
              document.body.style.cursor = 'default';
            }
          }}
          onBedClick={() => {
            const openModal = useUIStore.getState().openModal;
            openModal(<RestModal />);
          }}
        />
      </group>

      <Lamp />

      <Cat position={[2.25, -0.15, 2.1]} index={0} scale={1} />
      <Cat position={[4.55, -0.15, -6]} index={1} scale={1} />

      <group position={[-9.92, 4.2, -7.5]}>
        <NeonSign text={'Nerd By Day\nNerd By Night'} color="#6ee7ff" />
      </group>

      <group position={[-9.99, 4.2, -3.6]}>
        <Poster imageUrl="/posters/poster-1.webp" width={1.8} height={2.7} title="The Matrix" />
      </group>

      <group position={[-9.99, 4.2, 1.49]}>
        <Poster imageUrl="/posters/poster-2.webp" width={1.6} height={2.4} title="Dragonball Z" />
      </group>

      <group position={[-9.99, 3.36, -0.99]}>
        <Poster
          imageUrl="/posters/poster-landscape.jpg"
          width={3}
          height={1.6}
          title="World of Warcraft: Classic"
        />
      </group>

      <group position={[-9.99, 5.1, -0.97]}>
        <Poster
          imageUrl="/posters/poster-landscape-2.webp"
          width={2.975}
          height={1.56}
          title="Deftones"
        />
      </group>

      <LightSwitch position={[9.975, 4.2, -3]} />

      <BookShelf />
    </group>
  );
}
