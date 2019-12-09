/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('../../jest.base')

const config = Object.assign({}, baseConfig, {
  rootDir: __dirname,
  roots: ['<roodDir>', '<rootDir>/tests'],
  setupFiles: ['./tests/setup.ts']
})

config.globals['ts-jest'].tsConfig = 'tsconfig.test.json'

module.exports = config
