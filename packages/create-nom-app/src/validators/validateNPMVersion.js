import chalk from 'chalk'
import semver from 'semver'

const minimumNPMVersion = '6.0.0'

function validateNPMVersion(version) {
  console.log('Validating NPM version', version)

  if (!semver.gte(version, minimumNPMVersion)) {
    console.error(
      chalk.red(
        'Unable to create the project.'
        + `Your version of NPM ${version} is unsupported.\n`
        + `Create Nom App requires NPM ${minimumNPMVersion} or higher.\n`
        + 'Please update NPM.'
      )
    )

    process.exit(1)
  }
}

export default validateNPMVersion
