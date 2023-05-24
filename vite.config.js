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
        page51_en: resolve(root, 'page5-1_en', 'index.html'),
        page52_en: resolve(root, 'page5-2_en', 'index.html'),
        page53_en: resolve(root, 'page5-3_en', 'index.html'),
        page54_en: resolve(root, 'page5-4_en', 'index.html'),
        page55_en: resolve(root, 'page5-5_en', 'index.html'),
        /* ↑↑ */
      }
    }
  }
})
