/* eslint-disable no-underscore-dangle */
import { execSync } from 'child_process'
import os from 'os'
import path from 'path'

import fs from 'fs-extra'
import minimist from 'minimist'

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
      console.err('It looks like the directory has already been initialized.')
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

    console.log('git binary path is', this.gitBinary)
    execSync(`${this.gitBinary} init`, {
      cwd: this.projectDirectory
    })
    console.log('git adding files')
    execSync(`${this.gitBinary} add .`, {
      cwd: this.projectDirectory
    })
    console.log('git initial commit')
    execSync(`${this.gitBinary} commit -m "Initial commit from Create Nom App"`, {
      cwd: this.projectDirectory
    })
  }

  _writeBasePackage() {
    const installedNomScriptsVersion = (() => {
      const pathToNS = path.join(this.projectDirectory, 'node_modules', '.bin', 'nom-scripts')
      // Semver regex string provided by https://github.com/semver/semver/issues/232#issue-48635632
      const semverRegex = /(0|[5-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(-(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(\.(0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*)?(\+[0-9a-zA-Z-]+(\.[0-9a-zA-Z-]+)*)?/g

      return execSync(`${pathToNS} --version`).toString().match(semverRegex)
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
    console.log(`Creating app ${this.projectName}`)
    console.log('Copying structure and files from template.')
    const sourceTemplatePath = path.join(__dirname, '..', 'templates', 'base')
    console.log('from: ', sourceTemplatePath)
    console.log('to: ', this.projectDirectory)
    fs.copySync(sourceTemplatePath, this.projectDirectory)

    // Convert files to dotfiles, relative to project root directory.
    const dotfiles = ['gitignore', ['npmignore']]

    dotfiles.forEach((entry) => {
      const dotfile = typeof entry === 'string' ? entry : path.join(...entry)
      const nonDotfilePath = path.join(this.projectDirectory, dotfile)
      const pathToDotfile = path.join(this.projectDirectory, `.${dotfile}`)
      console.log('copying non-dotfile to ', pathToDotfile)
      try {
        if (fs.existsSync(nonDotfilePath)) {
          fs.renameSync(nonDotfilePath, pathToDotfile)
        }
      } catch (err) {
        console.error(err)
      }
    })

    // Create a package.json
    // TODO: `nom-scripts` needs to point to the local development directory
    // when in development mode because...
    this._writeBasePackage()
  }
}

const argv = minimist(process.argv.slice(2))
const options = JSON.parse(argv['options-string'])
console.log('argv', argv)
const init = new InitializeCNA(options)

init.verifyNoPreviousInit()
init.app()
init.gitRepo()
