module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true,
      node: true,
      'vue/setup-compiler-macros': true
    },
    plugins: [
      'vue',
      '@typescript-eslint'
    ],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:vue/vue3-recommended',
      'standard'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
      ecmaVersion: '2021',
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
      jsxPragma: 'React',
      ecmaFeatures: {
        jsx: true
      }
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-useless-catch': 'off',
      'no-async-promise-executor': 'off',
      'vue/multi-word-component-names': 'off',
  
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ]
    }
  };