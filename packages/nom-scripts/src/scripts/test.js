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

const mocha = new Mocha({

})

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

console.log('globbedSpecs', globbedSpecs)
console.log('specs', specs)

require("@babel/register")({
  presets: ["@babel/preset-env"]
})

// eslint-disable-next-line no-restricted-syntax
for (const spec of specs) {
  mocha.addFile(path.join(projectRoot, 'tests', spec))
}

mocha.run((fails => console.log(fails)))

console.log(mocha)
