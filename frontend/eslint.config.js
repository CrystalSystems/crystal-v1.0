import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['dist', '.vite', '**/node_modules/',] },
  { files: ["**/*.{js,jsx}"] },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: { globals: globals.browser },
    "settings": {
      "react": {
        "version": "detect"
      }
    },
    "rules": {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    }
  },
];