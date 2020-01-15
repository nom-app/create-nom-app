#!/usr/bin/env node

import path from 'path'

import chalk from 'chalk'
import glob from 'glob'
import jest from 'jest'
import minimist from 'minimist'
import Mocha from 'mocha'

import discoverRoot from '../packages/discoverRoot'

const args = minimist(process.argv.slice(2))
const hasCoverageFlag = 'coverage' in args

const projectRoot = discoverRoot()
// TODO: Make statement DRY. This statement is repeated in multiple `./scripts`
// files.
if (projectRoot === undefined) {
  console.error(
    `${chalk.red.inverse('FAIL')} ${chalk.blue('nom-scripts')} did not find a ${chalk.green('create-nom-app')} project.`
  )
  console.error('Did you run the script from the root directory of your create-nom-app?')

  process.exit(1)
}

const mocha = new Mocha()

const globbedSpecs = glob.sync('**/*.spec.*', {
  cwd: path.join(projectRoot, 'tests')
})

const specs = []

// eslint-disable-next-line no-restricted-syntax
for (const spec of globbedSpecs) {
  const specExt = path.extname(spec).slice(1)

  if (['js'].includes(specExt)) {
    specs.push(spec)
  }
}

if (hasCoverageFlag) {
  console.log('Coverage reports are not supported in your version of nom-scripts.')
  console.log('')
  console.log('Upgrade your nom-scripts dependency to get the latest features.')
  console.log('')
  console.log('Learn more about coverage support at: ')
  console.log('    https://create-nom.app/docs/feature/code-coverage')
  process.exit()
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('@babel/register')({
  presets: ['@babel/preset-env']
})
// eslint-disable-next-line no-restricted-syntax
for (const spec of specs) {
  mocha.addFile(path.join(projectRoot, 'tests', spec))
}

mocha.run()
