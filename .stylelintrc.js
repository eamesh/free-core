module.exports = {
    root: true,
    extends: [
      'stylelint-config-standard',
      // 'stylelint-config-html/vue',
      'stylelint-config-standard-scss',
      'stylelint-config-recommended-vue/scss',
    ],
    plugins: ['stylelint-order'],
    rules: {
      'indentation': 2,
      'selector-pseudo-element-no-unknown': [
        true,
        {
          ignorePseudoElements: [
            'v-deep',
            'deep',
            'input-placeholder'
          ]
        }
      ],
      'selector-class-pattern': null,
      'at-rule-no-unknown': null,
      'scss/at-rule-no-unknown': null,
      'number-leading-zero': 'never',
      'no-descending-specificity': null,
      'font-family-no-missing-generic-family-keyword': null,
      'selector-type-no-unknown': null,
      'no-duplicate-selectors': null,
      'no-empty-source':null,
      'selector-pseudo-class-no-unknown': [
        true,
        {
          ignorePseudoClasses: [
            'global',
            'deep'
          ],
        }
      ],
    },
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  };