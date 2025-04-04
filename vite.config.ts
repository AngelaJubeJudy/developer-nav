import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    open: true,
    host: true
  },
  build: {
    sourcemap: true,
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
