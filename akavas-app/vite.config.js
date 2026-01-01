import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/postcss';

export default defineConfig({
  server: { host: '0.0.0.0', port: 3000, strictPort: true },
  preview: { host: '0.0.0.0', port: 80, strictPort: true },
  plugins: [react({ include: /\.(jsx|js|tsx|ts)$/ })],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  esbuild: { loader: 'jsx', include: /src\/.*\.[jt]sx?$/, exclude: [] },
  optimizeDeps: { esbuildOptions: { loader: { '.js': 'jsx' } } },
  resolve: { alias: { '#src': '/src', 'pave-shim': '/pave-shim' } }
});
