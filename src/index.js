/* eslint-disable no-console */
import './require.node'

import chalk from 'chalk'
import program from 'commander'
import envinfo from 'envinfo'

import pkg from '../package.json'

const { version } = pkg


// TODO: Implement update-checker with update-notifier

program
  .description('create-nom-app description')
  .usage('<project-directory> [options]')
  // .command('<project-directory> [options]', 'creates a new nom app', {
  //   isDefault: true
  // })
  .option('--info', 'print environment info')
  .option('-v, --version', `output the version number ${version}`, () => {
    console.log(version)
    process.exit(0)
  })
  .option('-V', '', () => {
    console.log(version)
    process.exit(0)
  })

program.parse(process.argv)

if (program.info) {
  console.log(chalk.bold('\nEnvironment Info:'))

  envinfo
    .run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'Yarn', 'npm'],
        Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari'],
        npmPackages: ['nom-scripts'],
        npmGlobalPackages: ['create-nom-app']
      },
      {
        duplicates: true,
        showNotFound: true
      }
    )
    .then(console.log)
}

// console.log(program)
