import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';
import federation from '@originjs/vite-plugin-federation';

import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'very-fancy-components',
      filename: 'remoteEntry.js',
      exposes: {
        './button': './src/components/button.tsx',
        './input': './src/components/input.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
    dts(),
  ],
  build: {
    target: 'esnext',
  },
});
