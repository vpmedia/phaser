import js from '@eslint/js';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';

/** @type { import('eslint').Linter.Config[] } */
export default [
  {
    ignores: [
      '.github/**/*.*',
      '.idea/**/*.*',
      '.vscode/**/*.*',
      'build/**/*.*',
      'coverage/**/*.*',
      'dist/**/*.*',
      'public/**/*.*',
      'types/**/*.*',
      'node_modules/**/*.*',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.vitest,
        ...globals.browser,
        ...globals.node,
        ...globals.es2026,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      jsdoc: jsdocPlugin,
      unicorn: unicornPlugin,
    },
    settings: {
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
      },
      'import/resolver': {
        node: true,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jsdocPlugin.configs['flat/recommended'].rules,
      ...unicornPlugin.configs.recommended.rules,
      'no-unused-vars': 'off',
      'prefer-arrow-callback': 'warn',
      'prefer-template': 'warn',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/explicit-length-check': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-array-reverse': 'off',
      'unicorn/no-for-loop': 'off',
      'unicorn/no-immediate-mutation': 'warn',
      'unicorn/no-lonely-if': 'off',
      'unicorn/no-negated-condition': 'off',
      'unicorn/no-nested-ternary': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-this-assignment': 'off',
      'unicorn/no-typeof-undefined': 'off',
      'unicorn/no-undefined': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/number-literal-case': 'off',
      'unicorn/numeric-separators-style': 'off',
      'unicorn/prefer-add-event-listener': 'off',
      'unicorn/prefer-at': 'off',
      'unicorn/prefer-class-fields': 'off',
      'unicorn/prefer-code-point': 'off',
      'unicorn/prefer-default-parameters': 'off',
      'unicorn/prefer-dom-node-append': 'off',
      'unicorn/prefer-dom-node-remove': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prefer-includes': 'off',
      'unicorn/prefer-logical-operator-over-ternary': 'off',
      'unicorn/prefer-math-min-max': 'off',
      'unicorn/prefer-math-trunc': 'off',
      'unicorn/prefer-modern-dom-apis': 'off',
      'unicorn/prefer-modern-math-apis': 'off',
      'unicorn/prefer-optional-catch-binding': 'off',
      'unicorn/prefer-query-selector': 'off',
      'unicorn/prefer-regexp-test': 'off',
      'unicorn/prefer-single-call': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/prefer-string-replace-all': 'off',
      'unicorn/prefer-string-slice': 'off',
      'unicorn/prefer-structured-clone': 'off',
      'unicorn/prefer-switch': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/switch-case-braces': 'off',
    },
  },
];
