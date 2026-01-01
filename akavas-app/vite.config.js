import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  server: { host: '0.0.0.0', port: 3000, strictPort: true },
  preview: { host: '0.0.0.0', port: 80, strictPort: true },
  plugins: [react({ include: /\.(jsx|js|tsx|ts)$/ })],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  esbuild: { loader: 'jsx', include: /src\/.*\.[jt]sx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
  resolve: { alias: { '#src': '/src', 'pave-shim': '/pave-shim' } }
});
