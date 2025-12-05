import React, { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useUIStore } from '../../store/uiStore';

export default function DayNightCycle() {
  const dayNight = useUIStore(state => state.dayNight);
  const tex = useLoader(THREE.TextureLoader, '/city.jpg');

  const mat = useMemo(() => {
    const uniforms = {
      uTex: { value: tex },
      uT: { value: dayNight },
    } as any;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTex;
        uniform float uT;
        varying vec2 vUv;

        // simple random
        highp float rand(vec2 co){
          highp float a = 12.9898;
          highp float b = 78.233;
          highp float c = 43758.5453;
          highp float dt= dot(co.xy ,vec2(a,b));
          highp float sn= mod(dt,3.14);
          return fract(sin(sn) * c);
        }

        void main(){
          vec3 col = texture2D(uTex, vUv).rgb;
          // dim overall brightness toward night
          float brightness = mix(1.0, 0.12, uT);
          col *= brightness;
          // add cool night tint
          vec3 nightTint = vec3(0.05, 0.08, 0.18);
          col = mix(col, col * 0.35 + nightTint * 0.35, uT);

          // subtle star layer when mostly night
          float starMask = smoothstep(0.65, 1.0, uT);
          if (starMask > 0.0) {
            float r = rand(vUv * 1000.0);
            float star = step(0.9985, r) * (0.8 + 0.2 * rand(vUv * 2000.0));
            col += vec3(star * starMask);
          }

          gl_FragColor = vec4(col, 1.0);
        }
      `,
      transparent: false,
    });

    return material;
  }, [tex]);

  // update uniform each frame
  (mat as any).onBeforeCompile = () => {};
  if ((mat as any).uniforms) (mat as any).uniforms.uT.value = dayNight;

  return (
    <group position={[0, 3.5, -12.5]}>
      {' '}
      {/* slightly behind the window glass */}
      <mesh>
        <planeGeometry args={[18, 8.5]} />
        <primitive object={mat} attach="material" />
      </mesh>
    </group>
  );
}
