/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('../../jest.base')

const config = Object.assign({}, baseConfig, {
  rootDir: __dirname,
  roots: ['<roodDir>', '<rootDir>/tests'],
  setupFiles: ['./tests/setup.ts'],
  moduleNameMapper: {
    'package.json': '<rootDir>/tests/__mocks__/package.ts'
  }
})

config.globals['ts-jest'].tsConfig = 'tsconfig.json'
config.globals['ts-jest'].diagnostics = { warnOnly: true }

module.exports = config
