import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

import { libInjectCss } from 'vite-plugin-lib-inject-css';

const __dirname = new URL('.', import.meta.url).pathname;

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      include: ['src/components'],
    }),
  ],
  build: {
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'src/components/index.ts'),
      name: 'VeryFancyComponents',
      fileName: 'very-fancy-components',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // preserveModules: true,
      },
    },
  },
});
