/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',

  // Remove a extensão ".js" dos imports relativos para o Jest resolver os ".ts"
  // Necessário por causa do seu "module": "nodenext"
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },

  transform: {
    '^.+\\.ts$': ['ts-jest', { useESM: true }],
  },

  // Carrega o .env.test antes de qualquer módulo de teste
  setupFiles: ['<rootDir>/src/tests/setup.ts'],

  // Ignora os artefatos gerados pelo Prisma
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/generated/'],
};
