const vue = require('@vitejs/plugin-vue');
const vueJsx = require('@vitejs/plugin-vue-jsx');
const { defineConfig, build } = require('vite');

const buildConfig = defineConfig({
  plugins: [vue(), vueJsx()]
});

const example = async () => {
  await build({
    ...buildConfig,
    build: {
      lib: false,
      outDir: 'dist'
    }
  });
};

example();
