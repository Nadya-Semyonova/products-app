import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path'; 

const copyIndexTo404 = () => ({
  name: 'copy-index-to-404',
  writeBundle() {
    const indexHtml = path.resolve(__dirname, 'dist/index.html');
    const notFoundHtml = path.resolve(__dirname, 'dist/404.html');
    
    if (fs.existsSync(indexHtml)) {
      fs.copyFileSync(indexHtml, notFoundHtml);
      console.log('✅ 404.html создан из index.html');
    }
  },
});


export default defineConfig({
  plugins: [react(),copyIndexTo404()],
  base: '/products-app/',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})