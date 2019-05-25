import chalk from 'chalk'
import semver from 'semver'

const minimumYarnVersion = '1.8.0'

function validateYarnVersion(version) {
  console.log('Validating Yarn version', version)

  if (!semver.gte(version, minimumYarnVersion)) {
    console.error(
      chalk.red(
        'Unable to create the project.'
        + `Your version of Yarn ${version} is unsupported.\n`
        + `Create Nom App requires Yarn ${minimumYarnVersion} or higher.\n`
        + 'Please update Yarn.'
      )
    )

    process.exit(1)
  }
}

export default validateYarnVersion
