/* eslint-disable no-underscore-dangle */
import { sync as spawnSync } from 'cross-spawn'
import os from 'os'
import path from 'path'

import chalk from 'chalk'
import fs from 'fs-extra'
import minimist from 'minimist'

import logger from '../../../create-nom-app/src/logger'

class InitializeCNA {
  constructor(options) {
    this.projectDirectory = options.projectDirectory
    this.projectName = options.projectName
    this.packageManager = options.packageManager
    this.gitBinary = options.gitBinary

    this.hasPreviousInit = this.hasInit()
  }

  /**
   * We can tell if their is likely an init by checking for common directories
   * and files created during the init process.
   */
  hasInit() {
    let hasLikelyInited = false

    const pathsToCheck = ['src', 'tests', 'README.md']

    pathsToCheck.some((dir) => {
      const dirExists = fs.existsSync(path.join(this.projectDirectory, dir))

      if (dirExists) {
        hasLikelyInited = true
        return true
      }

      return false
    })

    return hasLikelyInited
  }

  verifyNoPreviousInit() {
    if (this.hasPreviousInit) {
      console.error('It looks like the directory has already been initialized.')
      process.exit(1)
    }
  }

  /**
   * Initializes a Git repo inside the project directory.
   */
  gitRepo() {
    if (typeof this.gitBinary !== 'string') {
      console.log('Skipping Git repo creation. Could not find Git on the system.')
      return
    }

    logger.debug('git binary path is', this.gitBinary)
    spawnSync(this.gitBinary, ['init'], {
      cwd: this.projectDirectory
    })

    logger.debug('git adding files')
    spawnSync(this.gitBinary, ['add', '.'], {
      cwd: this.projectDirectory
    })

    logger.debug('git initial commit')
    spawnSync(this.gitBinary, ['commit', '-m', '"Initial commit from Create Nom App"'], {
      cwd: this.projectDirectory
    })

    console.log('\nInitialized a git repository.')
  }

  _writeBasePackage() {
    const installedNomScriptsVersion = (() => {
      const pathToNS = path.join(this.projectDirectory, 'node_modules', '.bin', 'nom-scripts')
      // Semver regex string provided by https://github.com/semver/semver/issues/232#issue-48635632
      const semverRegex = /(0|[5-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?/g

      return spawnSync(pathToNS, ['--version'], {
        stdio: 'pipe'
      }).stdout.toString().match(semverRegex)
    })()

    const basePackage = {
      name: this.projectName,
      description: 'A boilerplate create-nom-app project.',
      version: '0.1.0',
      main: 'dist/main.js',
      private: true,
      scripts: {
        start: 'nom-scripts start',
        test: 'nom-scripts test',
        build: 'nom-scripts build',
        eject: 'nom-scripts eject'
      },
      eslintConfig: {
        extends: 'eslint-config-airbnb'
      },
      keywords: ['create-nom-app', 'boilerplate'],
      dependencies: {
        'nom-scripts': `^${installedNomScriptsVersion}`
      }
    }

    fs.writeJSONSync(path.join(this.projectDirectory, 'package.json'), basePackage, {
      spaces: 2,
      EOL: os.EOL,
      mode: '644'
    })
  }

  app() {
    logger.debug('Copying structure and files from template.')
    const sourceTemplatePath = path.join(__dirname, '..', 'templates', 'base')
    logger.debug('from: ', sourceTemplatePath)
    logger.debug('to: ', this.projectDirectory)
    fs.copySync(sourceTemplatePath, this.projectDirectory)

    // Convert files to dotfiles, relative to project root directory.
    const dotfiles = ['gitignore', ['npmignore']]

    dotfiles.forEach((entry) => {
      const dotfile = typeof entry === 'string' ? entry : path.join(...entry)
      const nonDotfilePath = path.join(this.projectDirectory, dotfile)
      const pathToDotfile = path.join(this.projectDirectory, `.${dotfile}`)
      logger.debug('copying non-dotfile to ', pathToDotfile)
      try {
        if (fs.existsSync(nonDotfilePath)) {
          fs.renameSync(nonDotfilePath, pathToDotfile)
        }
      } catch (err) {
        console.error(err)
      }
    })

    this._writeBasePackage()
  }

  success() {
    const isYarn = this.packageManager.manager === 'yarn'
    const commands = {
      start: `${isYarn ? 'yarn' : 'npm'} start`,
      test: `${isYarn ? 'yarn' : 'npm'} test`,
      build: `${isYarn ? 'yarn' : 'npm run'} build`
    }

    console.log(`\nSuccessfully created ${chalk.blue(this.projectName)}.`)
    console.log('\nBegin using your app with:\n')
    console.log(`  ${chalk.green('cd')} ${this.projectDirectory}`)
    console.log(`  ${chalk.green(commands.start)}`)
    console.log('\nAvailable commands:')
    console.log(`\n  ${chalk.green(commands.start)}`)
    console.log('    Start in development mode.')
    console.log(`\n  ${chalk.green(commands.test)}`)
    console.log('    Runs test scripts.')
    console.log(`\n  ${chalk.green(commands.build)}`)
    console.log('    Builds and optimizes for production.')
    console.log('')
  }
}

const argv = minimist(process.argv.slice(2))
const options = JSON.parse(argv['options-string'])

const init = new InitializeCNA(options)

init.verifyNoPreviousInit()

init.app()

init.gitRepo()

init.success()
