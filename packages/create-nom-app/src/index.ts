#!/usr/bin/env node

import './validators/validateNodeVersion'

import chalk from 'chalk'
import commander from 'commander'
import path from 'path'

import logger from './logger'
import writeHelp from './writeHelp'
import writeEnvInfo from './writeEnvInfo'
import validateProjectName from './validators/validateProjectName'
import validateProjectDirectory from './validators/validateProjectDirectory'
import validateNPMVersion from './validators/validateNPMVersion'
import validateYarnVersion from './validators/validateYarnVersion'
import CreateNomApp from './CreateNomApp'
import packageManagers from './package-managers'
import git from './discover-git'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json')

function main() {
  const cwd = process.cwd()
  let projectDirectory
  let projectName

  const program = new commander.Command('create-nom-app')
    .arguments('<project-name>')
    .usage(`${chalk.blue('<project-name>')} [options]`)
    .action(name => {
      projectName = name
      projectDirectory = path.join(cwd, projectName)
    })
    .on('--help', () => {
      writeHelp()
    })
    .option('--info', 'print environment info')
    .option('--use-npm')
    .option('--use-yarn')
    .option('-v, --version', `output the version number ${version}`, () => {
      console.log(`v${version}`)
      process.exit(0)
    })
    .option('-V', '', () => {
      console.log(`v${version}`)
      process.exit(0)
    })

  program.parse(process.argv)

  if (program.rawArgs.includes('-h') || program.rawArgs.includes('--help')) {
    program.help()
  }

  if (program.info) {
    return writeEnvInfo()
  }

  if (typeof projectName !== 'string') {
    console.log(`${chalk.green('create-nom-app')} ${chalk.blue('<project-name>')} [options]`)
    writeHelp()
    process.exit(0)
  }

  if (program.useNpm && program.useYarn) {
    console.error(chalk.red('Unable to create the project because you have --use-npm and --use-yarn.'))
    console.error(chalk.red('You must remove one of the options.'))
    process.exit(1)
  }

  packageManagers.discoverCommon()

  const preferredPackageManager = ((): false | 'npm' | 'yarn' => {
    if (program.useNpm) {
      return 'npm'
    }

    if (program.useYarn) {
      return 'yarn'
    }

    return false
  })()

  /**
   * If the user has a preference (via --use-{package-manager}) then it will
   * load that manager. If the preferred manager does not exist, an error will
   * be provided and the process will quit.
   *
   * If the user has no preference, then it will search through a list of
   * package managers and return the first existing manager on the system.
   *
   * If no package manager exists on the system, an error is logged and the
   * process quits.
   */
  // eslint-disable-next-line consistent-return
  const usePackageManager = (() => {
    if (preferredPackageManager) {
      if (packageManagers.hasManager(preferredPackageManager)) {
        return preferredPackageManager
      }

      console.error(
        chalk.red(`You preferred the package manager ${preferredPackageManager}, which was not found on your system.`)
      )
      console.error(chalk.red('You can install the package manager you prefer, or remove any preference.'))
      process.exit(1)
    }

    const pkgManagerDefaultPreference = ['yarn', 'npm']

    // eslint-disable-next-line no-restricted-syntax
    for (const manager of pkgManagerDefaultPreference) {
      if (packageManagers.hasManager(manager)) {
        return manager
      }
    }

    console.error(chalk.red('Unable to find any package managers on your system.'))
    console.error(chalk.red(`Searched for ${pkgManagerDefaultPreference.join(', ')}.`))
    console.error(chalk.red('Please install a package manager.'))
    process.exit(1)
  })()

  const packageManagerBinary = packageManagers.getManager(usePackageManager).binary

  logger.debug('pref', preferredPackageManager, ';using', usePackageManager, ';binary', packageManagerBinary)

  if (usePackageManager === 'npm') {
    validateNPMVersion(packageManagers.getManager('npm').version)
  }

  if (usePackageManager === 'yarn') {
    validateYarnVersion(packageManagers.getManager('yarn').version)
  }

  validateProjectName(projectName)
  validateProjectDirectory(projectDirectory)

  git.discoverGit()

  const { gitBinary } = git.gitInfo
  logger.debug('gitInfo', git.gitInfo)

  const app = new CreateNomApp(projectName, {
    projectDirectory,
    packageManager: {
      manager: usePackageManager,
      binary: packageManagerBinary
    },
    gitBinary
  })

  logger.debug('createNomApp', app)

  app.ensureProjectDir()
  app.installPackages()
  app.handoff()

  return undefined
}

main()
