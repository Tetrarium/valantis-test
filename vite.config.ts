import { defineConfig } from 'vite';
import paths from 'vite-tsconfig-paths';

export default defineConfig({
  base: './',
  root: './src',
  publicDir: './public',
  build: {
    emptyOutDir: true,
    outDir: '../dist',
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    watch: {
      usePolling: true,
    }
  },
  plugins: [
    paths({ root: '../' }),
  ],
});
