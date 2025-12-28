import { useRef } from 'react';
import type { ThreeEvent } from '@react-three/fiber';
import { useUIStore } from '../../store/uiStore';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import * as THREE from 'three';
import styles from './Cat.module.scss';

type CatProps = {
  position?: [number, number, number];
  images?: string[];
  index?: 0 | 1;
  scale?: number;
};

export default function Cat({ position = [6.2, -0.46, -8.5], images, index, scale = 1 }: CatProps) {
  const { showTooltip, hideTooltip, openModal } = useUIStore();

  const defaults = ['/cats/drogo.webp', '/cats/sylvy.webp'];
  const imgs = images && images.length >= 2 ? images : defaults;

  const playMeow = (variant: 0 | 1) => {
    try {
      // prefer standard AudioContext, fallback to legacy webkitAudioContext
      type Win = Window & {
        webkitAudioContext?: typeof AudioContext;
        AudioContext?: typeof AudioContext;
      };
      const Ctor = (window as Win).AudioContext ?? (window as Win).webkitAudioContext;
      if (!Ctor) return;
      const ctx = new Ctor();
      const master = ctx.createGain();
      master.connect(ctx.destination);
      master.gain.value = 0.25;

      const now = ctx.currentTime;
      const duration = variant === 0 ? 0.35 : 0.42;

      const baseFreq = variant === 0 ? 480 : 520;
      const endFreq = variant === 0 ? 680 : 750;

      // oscillator 1: sweeping sine for the "meeee" part
      const osc1 = ctx.createOscillator();
      const g1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(baseFreq, now);
      osc1.frequency.exponentialRampToValueAtTime(endFreq, now + duration * 0.6);
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 0.85, now + duration);
      g1.gain.setValueAtTime(0.0, now);
      g1.gain.linearRampToValueAtTime(0.3, now + 0.01);
      g1.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc1.connect(g1);
      g1.connect(master);
      osc1.start(now);
      osc1.stop(now + duration + 0.05);

      // oscillator 2: slight noise texture with triangle wave
      const osc2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(baseFreq * 1.98, now);
      osc2.frequency.exponentialRampToValueAtTime(endFreq * 2.1, now + duration * 0.5);
      g2.gain.setValueAtTime(0.0, now);
      g2.gain.linearRampToValueAtTime(0.08, now + 0.02);
      g2.gain.exponentialRampToValueAtTime(0.001, now + duration * 0.85);
      osc2.connect(g2);
      g2.connect(master);
      osc2.start(now);
      osc2.stop(now + duration + 0.05);

      setTimeout(
        () => {
          try {
            ctx.close();
          } catch {
            /* ignore */
          }
        },
        (duration + 0.1) * 1000
      );
    } catch {
      // audio not available
    }
  };

  const texA = useLoader(THREE.TextureLoader, imgs[0]);
  const texB = useLoader(THREE.TextureLoader, imgs[1]);
  // @ts-expect-error: three-fiber Group typing interop — allow using THREE.Group for refs
  const aRef = useRef<THREE.Mesh | null>(null);
  // @ts-expect-error: three-fiber Group typing interop — allow using THREE.Group for refs
  const bRef = useRef<THREE.Mesh | null>(null);
  const aHover = useRef(false);
  const bHover = useRef(false);

  const { camera } = useThree();

  // breathing animation: scale Y of each billboard slightly, with slight phase offset
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const sA = 1 + Math.sin(t * 1.2) * 0.03;
    const sB = 1 + Math.sin(t * 1.2 + 0.5) * 0.03;
    if (aRef.current) {
      const base = scale;
      const hoverMul = aHover.current ? 1.06 : 1;
      aRef.current.scale.x = base * hoverMul;
      aRef.current.scale.y = sA * base * hoverMul;
      aRef.current.scale.z = base * hoverMul;
      // Subtle brighten on hover - like ambient lighting
      if (aRef.current.material) {
        aRef.current.material.emissive = aHover.current
          ? new THREE.Color('#fffae5')
          : new THREE.Color('#000000');
        aRef.current.material.emissiveIntensity = aHover.current ? 0.02 : 0;
      }
    }
    if (bRef.current) {
      const base = scale;
      const hoverMul = bHover.current ? 1.06 : 1;
      bRef.current.scale.x = base * hoverMul;
      bRef.current.scale.y = sB * base * hoverMul;
      bRef.current.scale.z = base * hoverMul;
      // Subtle brighten on hover - like ambient lighting
      if (bRef.current.material) {
        bRef.current.material.emissive = bHover.current
          ? new THREE.Color('#fffae5')
          : new THREE.Color('#000000');
        bRef.current.material.emissiveIntensity = bHover.current ? 0.02 : 0;
      }
      bRef.current.lookAt(camera.position);
    }
  });
  const openGallery = () => {
    openModal(
      <div className={styles.catGalleryModal}>
        <h2 className={styles.catGalleryTitle}>My Cats</h2>
        <div className={styles.catGalleryFlex}>
          <div className={styles.catGalleryCol}>
            <div className={styles.catGalleryNameDrogo}>Drogo</div>
            <img src={imgs[0]} className={styles.catGalleryImg} alt="Drogo the cat" />
            <ul className={styles.catGalleryList}>
              <li>Named after the Dothraki warlord Khal Drogo from Game of Thrones.</li>
              <li>Clouded Jack: Savannah, Bengal, PixeBob hybrid.</li>
              <li>Natural fighter, hunter, and explorer.</li>
              <li>Curious and rambunctious. Likes to open doors.</li>
              <li>Enjoys being outdoors and getting into trouble around the neighborhood.</li>
              <li>Loves eating his favorite meal, Tuna Fillet with Sea Weed.</li>
            </ul>
          </div>
          <div className={styles.catGalleryCol}>
            <div className={styles.catGalleryName}>Sylvia</div>
            <img src={imgs[1]} className={styles.catGalleryImg} alt="Sylvia the cat" />
            <ul className={styles.catGalleryList}>
              <li>Her name means "forest" or "spirit of the wood" in Latin.</li>
              <li>Super agile and playful. Will chase anything moving.</li>
              <li>Hyper-vigilant and timid.</li>
              <li>Likes being outside and watching the birds and squirrels.</li>
              <li>
                Prefers being inside and sunbathing by the window, or being a mushy lump on the
                bed/sofa.
              </li>
              <li>Highly vocal and affectionate.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <group position={position}>
      {/* Drogo */}
      {index === undefined || index === 0 ? (
        <Billboard position={index === undefined ? [0, 1.15, 0.8] : [0, 0.9, 0]} follow={true}>
          <mesh
            ref={aRef}
            scale={[scale, scale, scale]}
            onPointerOver={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
              aHover.current = true;
              showTooltip('Drogo', e.clientX, e.clientY);
            }}
            onPointerMove={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation();
              showTooltip('Drogo', e.clientX, e.clientY);
            }}
            onPointerOut={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation();
              document.body.style.cursor = 'default';
              aHover.current = false;
              hideTooltip();
            }}
            onClick={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation();
              hideTooltip();
              playMeow(0);
              openGallery();
            }}
          >
            <planeGeometry
              args={[
                1.5 * scale,
                1.5 * (texA.image ? texA.image.height / texA.image.width : 1) * scale,
                8,
                8,
              ]}
            />
            <meshStandardMaterial map={texA} transparent={true} />
          </mesh>
        </Billboard>
      ) : null}
      {/* Sylvia */}
      {index === undefined || index === 1 ? (
        <mesh
          ref={bRef}
          position={[-10, 1.86, 2.15]}
          scale={[scale, scale, scale]}
          onPointerOver={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
            bHover.current = true;
            showTooltip('Sylvia', e.clientX, e.clientY);
          }}
          onPointerMove={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            showTooltip('Sylvia', e.clientX, e.clientY);
          }}
          onPointerOut={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            document.body.style.cursor = 'default';
            bHover.current = false;
            hideTooltip();
          }}
          onClick={(e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            hideTooltip();
            playMeow(1);
            openGallery();
          }}
        >
          <planeGeometry
            args={[
              1.1 * scale,
              1.1 * (texB.image ? texB.image.height / texB.image.width : 1) * scale,
              8,
              8,
            ]}
          />
          <meshStandardMaterial map={texB} transparent={true} />
        </mesh>
      ) : null}
    </group>
  );
}
