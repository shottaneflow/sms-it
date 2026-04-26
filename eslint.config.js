const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const playwrightPlugin = require('eslint-plugin-playwright');

module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'playwright': playwrightPlugin,
    },
    rules: {

      '@typescript-eslint/no-floating-promises': 'error',    
      '@typescript-eslint/await-thenable': 'error',         
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'warn',

      'playwright/no-wait-for-timeout': 'warn',          
      'playwright/no-force-option': 'warn',                  
      'playwright/prefer-web-first-assertions': 'error',    
      'playwright/no-conditional-in-test': 'warn',

      'no-console': 'off',
      'prefer-const': 'error',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', 'test-results/', 'allure-results/'],
  },
];