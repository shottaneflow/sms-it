/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  testTimeout: 60000,
  reporters: [
    'default',
    ['allure-jest/node', { resultsDir: 'allure-results' }],
  ],
};

module.exports = config;