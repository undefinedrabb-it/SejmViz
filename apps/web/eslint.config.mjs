import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import * as reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { FlatCompat } from "@eslint/eslintrc";
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'
import eslintPluginImportX from 'eslint-plugin-import-x'



const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  resolvePluginsRelativeTo: import.meta.dirname,       // optional
  recommendedConfig: pluginJs.configs.recommended, // optional unless you're using "eslint:recommended"
  allConfig: pluginJs.configs.all,                 // optional unless you're using "eslint:all"
});

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      "**/genData.mjs"
    ]
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    }
  },
  { settings: { react: { version: 'detect' } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  {
    settings: {
      "import-x/resolver-next": [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        }),
      ]
    }
  },
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    rules: {
      'no-unused-vars': 'off',
      "import-x/order": [
        "error",
        {
          "groups": ["builtin", "external", "parent", "sibling", "index"]
        }
      ]
    },
  },
  ...compat.config({
    extends: ['plugin:@next/next/recommended'],

  }),
  {
    plugins: {
      'react-hooks': reactHooks
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },
];