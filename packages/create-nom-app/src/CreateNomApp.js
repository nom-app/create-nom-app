/* eslint-disable no-underscore-dangle */
import { execSync } from 'child_process'
import os from 'os'
import path from 'path'
import fs from 'fs-extra'

const defaultOptions = {
  projectDirectory: null,
  packageManagerBinary: null,
  gitBinary: null
}

class CreateNomApp {
  constructor(projectName, options) {
    // TODO: Do recursive deep-assign
    this.projectName = projectName
    this.options = Object.assign({}, defaultOptions, options)
  }

  /**
   * Initializes a Git repo inside the project directory.
   */
  initGitRepo() {
    if (typeof this.options.gitBinary !== 'string') {
      console.log('Skipping Git repo creation. Could not find Git on the system.')
      return
    }

    console.log('git binary path is', this.options.gitBinary)
    execSync(`${this.options.gitBinary} init`, {
      cwd: this.options.projectDirectory
    })
    console.log('git adding files')
    execSync(`${this.options.gitBinary} add .`, {
      cwd: this.options.projectDirectory
    })
    console.log('git initial commit')
    execSync(`${this.options.gitBinary} commit -m "Initial commit from Create Nom App"`, {
      cwd: this.options.projectDirectory
    })
  }

  _writeBasePackage() {
    const basePackage = {
      name: this.projectName,
      description: 'A boilerplate create-nom-app project.',
      version: '0.1.0',
      main: 'lib/index.js',
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
        'nom-scripts': '^0.1.0'
      }
    }

    fs.writeJSONSync(path.join(this.options.projectDirectory, 'package.json'), basePackage, {
      spaces: 2,
      EOL: os.EOL,
      mode: '644'
    })
  }

  create() {
    console.log(`Creating app ${this.projectName}`)
    // console.log('Ensuring app directory')
    // fs.ensureDirSync(this.options.projectDirectory)
    console.log('Copying structure and files from template.')
    const sourceTemplatePath = path.join(__dirname, 'templates', 'base')
    console.log('from: ', sourceTemplatePath)
    console.log('to: ', this.options.projectDirectory)
    fs.copySync(sourceTemplatePath, this.options.projectDirectory)

    // Convert files to dotfiles, relative to project root directory.
    const dotfiles = ['gitignore', ['npmignore']]

    dotfiles.forEach((entry) => {
      const dotfile = typeof entry === 'string' ? entry : path.join(...entry)
      const nonDotfilePath = path.join(this.options.projectDirectory, dotfile)
      const pathToDotfile = path.join(this.options.projectDirectory, `.${dotfile}`)
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

export default CreateNomApp
