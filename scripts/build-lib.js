const vue = require('@vitejs/plugin-vue');
const vueJsx = require('@vitejs/plugin-vue-jsx');
const { defineConfig, build } = require('vite');
const { resolve } = require('path');

const buildConfig = defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, '../src/index.ts'),
      name: 'free-core',
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

const example = async () => {
  await build(buildConfig);
};

example();
