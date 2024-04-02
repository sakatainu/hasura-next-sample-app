const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions: { paths } } = require('./tsconfig')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(paths , { prefix: '<rootDir>/' } ),
  /*
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^#/(.*)$': '<rootDir>/test/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  */
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': [
      'esbuild-jest',
      {
        sourcemap: true,
      },
    ],
  },
  globals: {
    'ts-jest': {
    // isolatedModules: true
    },
  },
  // globalSetup: '<rootDir>/test/setup.ts',
  testMatch: [
    '**/test/**/*.test.ts',
  ],
  // maxConcurrency: 1,
  // setupFiles: ['<rootDir>/test/setup.ts'],

  testTimeout: 30000,
}
