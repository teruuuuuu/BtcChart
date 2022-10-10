import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // root: './',
  // publicDir: './public',
  plugins: [react()],
  esbuild: {
    // jsxInject: `import React from 'react';`,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 8081
  }
});