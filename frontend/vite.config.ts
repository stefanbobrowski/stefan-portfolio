import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      three: resolve(__dirname, 'node_modules/three'),
      three$: resolve(__dirname, 'node_modules/three/build/three.module.js'),
    },
    dedupe: ['three'],
  },
  optimizeDeps: {
    include: ['three', 'three-stdlib'],
  },
  ssr: {
    noExternal: ['three', 'three-stdlib'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
