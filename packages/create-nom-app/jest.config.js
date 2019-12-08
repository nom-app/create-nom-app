/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('../../jest.base')

const config = Object.assign({}, baseConfig, {
  rootDir: __dirname
})

config.globals['ts-jest'].tsConfig = 'tsconfig.test.json'

module.exports = config
