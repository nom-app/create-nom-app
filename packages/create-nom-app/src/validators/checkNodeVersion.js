// Create Nom App support is based on the end-of-life date for each Node version
// determined by the Node.js Foundation. See
// https://nodejs.org/en/about/releases/ for more details.
import chalk from 'chalk'

const currentNodeVersion = process.versions.node
const semver = currentNodeVersion.split('.')
const major = semver[0]

/**
 * Check the current version of node against `majorMinimum`. If current version
 * node is below `majorMinimum`, an error is logged to the console and the
 * application exits with status code `1`.
 *
 * @param {Integer} majorMinimum The minimum major version of Node to allow.
 */
function checkNodeVersion(majorMinimum) {
  if (major < majorMinimum) {
    // eslint-disable-next-line no-console
    console.error(
      chalk.red(
        `Your version of Node ${currentNodeVersion} is unsupported.\n` +
          `Create Nom App requires Node ${majorMinimum} or higher.\n` +
          'Please update Node. ' +
          'https://nodejs.org/en/download/'
      )
    )

    process.exit(1)
  }
}

export default checkNodeVersion
