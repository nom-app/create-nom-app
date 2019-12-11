#!/usr/bin/env node

import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
// import minimist from 'minimist'
import { sync as rimrafSync } from 'rimraf'
import { sync as isDirSync } from 'is-directory'
import webpack, { ICompiler } from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'
import nodeExternals from 'webpack-node-externals'

import discoverRoot from '../packages/discoverRoot'
// import whichManager from '../packages/package-managers-local'
// const packageManager = whichManager(projectRoot)

const projectRoot = discoverRoot()

const isProduction = true

const statsHandler: ICompiler.Handler = (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log('Failed to build the app.')
    return
  }

  console.log('Built your app.')
}

function main(): void {
  if (typeof projectRoot !== 'string') {
    console.error(
      `${chalk.red.inverse('FAIL')} ${chalk.blue('nom-scripts')} did not find a ${chalk.green(
        'create-nom-app'
      )} project.`
    )
    console.error('Did you run the script from the root directory of your create-nom-app?')

    process.exit(1)
  }
  const pkgPath = path.join(projectRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
  const distDir = path.join(projectRoot, 'dist')

  if (isDirSync(distDir)) {
    rimrafSync(distDir)
  }

  const compiler = webpack({
    context: projectRoot,
    entry: path.join(projectRoot, 'src', 'main.js'),
    mode: isProduction ? 'production' : 'development',
    optimization: {
      minimize: false
    },
    target: 'node',
    externals: [nodeExternals()],
    devtool: isProduction ? false : 'inline-source-map',
    output: {
      filename: 'main.js',
      path: distDir,
      library: pkg.name,
      libraryTarget: 'umd',
      umdNamedDefine: true,
      // Issue described at https://github.com/webpack/webpack/issues/6525
      // Solution provided by https://github.com/webpack/webpack/issues/6522#issuecomment-371120689
      globalObject: "typeof self !== 'undefined' ? self : this"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {}
          }
        }
      ]
    },
    resolve: {
      modules: ['node_modules']
    },
    plugins: [new FriendlyErrorsWebpackPlugin()]
  })

  compiler.run(statsHandler)

  return undefined
}

main()
