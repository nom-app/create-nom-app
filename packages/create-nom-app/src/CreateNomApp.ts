import chalk from 'chalk'
import { sync as spawnSync } from 'cross-spawn'

import path from 'path'
import fs from 'fs-extra'

import logger from './logger'

interface Options {
  projectDirectory: string
  packageManager: {
    manager: 'npm' | 'yarn'
    binary: string
  }
  gitBinary?: string
}

const defaultOptions: Pick<Options, 'gitBinary'> = {
  gitBinary: undefined
}

class CreateNomApp {
  projectName: string
  options: Options

  constructor(projectName: string, options: Options) {
    console.log(`Creating ${chalk.blue(projectName)} app.`)

    // TODO: Do recursive deep-assign
    this.projectName = projectName
    this.options = Object.assign({}, defaultOptions, options)
  }

  ensureProjectDir(): void {
    fs.ensureDirSync(this.options.projectDirectory)
  }

  installPackages(): void {
    console.log(`\nInstalling ${chalk.green('nom-scripts')}. This may take a few minutes...\n`)

    logger.debug('package manager is', this.options.packageManager.manager, 'at', this.options.packageManager.binary)
    const dependencies = ['nom-scripts']
    let installCommand

    // eslint-disable-next-line default-case
    switch (this.options.packageManager.manager) {
      case 'npm':
        installCommand = ['install', '--save']
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

  handoff(): void {
    const nomScriptsBin = path.resolve(
      this.options.projectDirectory,
      path.join(this.options.projectDirectory, 'node_modules', '.bin', 'nom-scripts')
    )
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
    if (handoffProc.status) {
      console.error(
        `Create Nom App failed failed to initialize the project and exited with code ${handoffProc.status}.`
      )
      console.error(handoffProc.error)
      process.exit(handoffProc.status || 1)
    }
  }
}

export default CreateNomApp
