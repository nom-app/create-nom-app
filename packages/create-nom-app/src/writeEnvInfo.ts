// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import envinfo from 'envinfo'
import chalk from 'chalk'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json')

async function writeEnvInfo(): Promise<void> {
  console.log(chalk.bold('\nEnvironment Info:'))
  process.stdout.write(`  Create Nom App: ${version}`)
  await envinfo
    .run(
      {
        System: ['OS', 'CPU'],
        Binaries: ['Node', 'npm', 'Yarn'],
        Utilities: ['Git'],
        Browsers: ['Chrome', 'Edge', 'Firefox', 'Internet Explorer', 'Safari'],
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

export default writeEnvInfo
