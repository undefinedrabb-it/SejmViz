import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript'

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import baseConfig from '../../eslint.config.mjs';


const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...baseConfig,
  {
    ignores: ['.next/**/*'],
  },
  {
    ignores: [
      "**/genData.mjs"
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    }
  },
  { settings: { react: { version: 'detect' } } },
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

  ...fixupConfigRules(compat.extends('next')),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')),
  ...fixupConfigRules(compat.extends('plugin:@next/next/recommended')),
  {
    // plugins: {
    //   'react-hooks': reactHooks
    // },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    }
  },
];
