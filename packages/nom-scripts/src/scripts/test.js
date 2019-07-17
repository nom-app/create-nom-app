import path from 'path'

import { sync as spawnSync } from 'cross-spawn'
import chalk from 'chalk'
import glob from 'glob'
import Mocha from 'mocha'
import discoverRoot from '../packages/discoverRoot'

const projectRoot = discoverRoot()

// TODO: Make statement DRY. This statement is repeated in multiple `./scripts`
// files.
if (projectRoot === undefined) {
  console.error(`${chalk.red.inverse('FAIL')} ${chalk.blue('nom-scripts')} did not find a ${chalk.green('create-nom-app')} project.`)
  console.error('Did you run the script from the root directory of your create-nom-app?')

  process.exit(1)
}

console.log('Tests are not available in your version of nom-scripts.')
console.log('\nYou may need to update your nom-scripts dependency.\n')
