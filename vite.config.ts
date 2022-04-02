import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: process.env.NODE_ENV !== 'production'
      ? {
          'free-layout': resolve(__dirname, './src')
        }
      : undefined
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'free-layout',
      fileName: (formats) => `free-layout.${formats}.js`
    },
    rollupOptions: {
      external: [
        'vue'
      ],
      output: {
        sourcemap: true,
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
});
