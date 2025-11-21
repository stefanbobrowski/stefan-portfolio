import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});
