const { configs } = require('@typescript-eslint/eslint-plugin');
const parser = require('@typescript-eslint/parser');
const n8nNodesBase = require('eslint-plugin-n8n-nodes-base');

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', '*.js'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'n8n-nodes-base': n8nNodesBase,
    },
    rules: {
      ...configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      'n8n-nodes-base/node-param-description-missing-final-period': 'off',
      'n8n-nodes-base/node-param-description-wrong-for-return-all': 'off',
    },
  },
];
