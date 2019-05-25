import envinfo from 'envinfo'
import chalk from 'chalk'

async function writeEnvInfo() {
  console.log(chalk.bold('\nEnvironment Info:'))

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
