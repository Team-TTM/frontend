import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default [
  // Configuration de base ESLint pour JavaScript
  js.configs.recommended,

  // Configuration pour Vue.js
  ...pluginVue.configs['flat/essential'],

  // Définition des fichiers à analyser
  {
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  // Définition des fichiers à ignorer
  {
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // Configuration pour Cypress
  {
    ...pluginCypress.configs.recommended,
    files: [
      '**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
      'cypress/support/**/*.{js,ts,jsx,tsx}',
    ],
  },
];
