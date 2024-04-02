const { pathsToModuleNameMapper } = require('ts-jest');
const {
  compilerOptions: { baseUrl, paths },
} = require('./tsconfig.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
const configs = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/__test__/jest.setup.ts'],
  moduleNameMapper: pathsToModuleNameMapper(paths, {
    prefix: `<rootDir>/${baseUrl}`,
  }),
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': '@swc/jest',
  },
};

module.exports = configs;
