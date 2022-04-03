import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

console.log(process.env.NODE_ENV);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      'free-layout': resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'free-layout',
      fileName: (formats) => `${formats}/index.js`
    },
    rollupOptions: {
      external: [
        'vue',
        'naive-ui'
      ],
      output: {
        sourcemap: true,
        globals: {
          vue: 'Vue',
          'naive-ui': 'naive-ui'
        }
      }
    }
  }
});
