import { sync as spawnSync } from 'cross-spawn'

import path from 'path'
import fs from 'fs-extra'

import pkg from '../package'

const defaultOptions = {
  projectDirectory: null,
  packageManager: null,
  gitBinary: null
}

class CreateNomApp {
  constructor(projectName, options) {
    // TODO: Do recursive deep-assign
    this.projectName = projectName
    this.options = Object.assign({}, defaultOptions, options)
  }

  ensureProjectDir() {
    fs.ensureDirSync(this.options.projectDirectory)
  }

  installPackages() {
    console.log('package manager is', this.options.packageManager.manager, 'at', this.options.packageManager.binary)
    const cnaMajorVersion = pkg.version.split('.')[0]
    const dependencies = [`nom-scripts@^${cnaMajorVersion}`]
    let installCommand

    // eslint-disable-next-line default-case
    switch (this.options.packageManager.manager) {
      case 'npm':
        installCommand = ['install', '--save', '--verbose']
        break
      case 'yarn':
        installCommand = ['add']
        break
    }

    installCommand.push(...dependencies)
    const install = spawnSync(this.options.packageManager.binary, installCommand, {
      cwd: this.options.projectDirectory,
      stdio: 'inherit'
    })

    if (install.status !== 0) {
      console.error(`Failed to execute ${this.options.packageManager.binary} ${installCommand.join(' ')}`)
      process.exit(1)
    }
  }

  handoff() {
    const nomScriptsBin = path.resolve(this.options.projectDirectory,
      path.join(this.options.projectDirectory, 'node_modules', '.bin', 'nom-scripts'))
    const handoffOptions = JSON.stringify({
      projectName: this.projectName,
      projectDirectory: this.options.projectDirectory,
      packageManager: this.options.packageManager,
      gitBinary: this.options.gitBinary
    })
    const handoffProc = spawnSync(nomScriptsBin, ['init', '--options-string', handoffOptions], {
      stdio: 'inherit',
      cwd: this.options.projectDirectory
    })

    if (handoffProc.status !== 0) {
      console.log('Create Nom App failed during handoff to local create-nom-app project.')
      process.exit(handoffProc.status)
    }
  }
}

export default CreateNomApp
