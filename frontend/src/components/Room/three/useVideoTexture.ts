import { useEffect, useRef } from 'react';
import { VideoTexture } from 'three';

export function useVideoTexture(src: string) {
  const textureRef = useRef<unknown>(null);

  useEffect(() => {
    const video = document.createElement('video');
    video.src = src;
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.play().catch(() => {
      // browsers sometimes block autoplay → retry once user interacts
      document.addEventListener('click', () => video.play().catch(() => {}), { once: true });
    });

    const tex = new VideoTexture(video);

    tex.minFilter = 1008; // LinearFilter
    tex.magFilter = 1006; // LinearFilter
    tex.needsUpdate = true;

    textureRef.current = tex;
  }, [src]);

  return textureRef;
}
