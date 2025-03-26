import nx from '@nx/eslint-plugin';
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginImportX from 'eslint-plugin-import-x'
// import pluginReact from "eslint-plugin-react";
// import * as reactHooks from 'eslint-plugin-react-hooks';
// import jsxA11y from 'eslint-plugin-jsx-a11y';



export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended,
  // pluginReact.configs.flat['jsx-runtime'],
  // jsxA11y.flatConfigs.recommended,
  {
    ignores: [
      '**/dist',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
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
];
