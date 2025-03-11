import globals from "globals";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-var": "error", // Interdit l'utilisation de var
      "quotes": ["error", "double"], // Force l'utilisation des guillemets doubles
      "semi": ["error", "always"], // Force l'utilisation de points-virgules
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
      ]
    },
  },
  ...pluginVue.configs["flat/essential"],
];


