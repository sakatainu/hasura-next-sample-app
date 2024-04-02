const nextJest = require('next/jest');
const { pathsToModuleNameMapper } = require('ts-jest');
const {
  compilerOptions: { baseUrl, paths },
} = require('./tsconfig.json');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

const configs = {
  setupFilesAfterEnv: ['<rootDir>/src/__test__/jest.setup.ts'],
  moduleNameMapper: pathsToModuleNameMapper(paths, {
    prefix: `<rootDir>/${baseUrl}`,
  }),
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  passWithNoTests: true,
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(configs);
