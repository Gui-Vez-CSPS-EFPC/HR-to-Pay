import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [vue()],
  assetsInclude: "**/*.vtt",
  base: '',
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),

        /* ↓↓ Edit  to rename/create new page (see readme) */
        page1: resolve(root, 'page1', 'index.html'),
        page2: resolve(root, 'page2', 'index.html'),
        /* ↑↑ */
      }
    }
  }
})
