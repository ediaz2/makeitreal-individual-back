require('@rushstack/eslint-patch/modern-module-resolution');
const { dependencies } = require('./package.json');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: { '~': './src' },
        extensions: ['.ts'],
      },
    },
  },
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'no-plusplus': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': [
      'error',
      {
        ignore: [...Object.keys(dependencies || {}), 'vitest/config'],
      },
    ],
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
