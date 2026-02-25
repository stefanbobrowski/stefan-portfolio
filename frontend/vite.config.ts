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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split three.js and its ecosystem into separate chunk
          'three-vendor': [
            'three',
            'three-stdlib',
            '@react-three/fiber',
            '@react-three/drei',
            'postprocessing',
          ],
          // Split other heavy vendors
          vendor: ['react', 'react-dom', 'react-router-dom', 'zustand'],
          // Keep lottie separate since it's only on about page
          lottie: ['lottie-react'],
        },
      },
    },
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
