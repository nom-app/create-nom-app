// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // The directory where Jest should store its cached dependency information
  coverageDirectory: 'coverage',
  // A list of reporter names that Jest uses when writing coverage reports
  // coverageReporters: [
  //   "json",
  //   "text",
  //   "lcov",
  //   "clover"
  // ],

  coverageReporters: ['json', 'text', 'lcov'],

  // TODO: Add coverageThreshold
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: 80
  //   }
  // },
  globals: {
    'ts-jest': {
      tsConfig: 'override-value-in-extended-modules'
    }
  },
  preset: 'ts-jest',
  rootDir: 'override-value-in-extended-modules',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|ts)x?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'json'] // Note: `--ext .ts,.ts,...` is still required when calling `eslint` from command line
}
