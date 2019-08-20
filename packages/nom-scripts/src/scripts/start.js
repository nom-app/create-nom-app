import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import minimist from 'minimist'
import MemoryFileSystem from 'memory-fs'
import nodeExternals from 'webpack-node-externals'

import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'

import discoverRoot from '../packages/discoverRoot'
import whichManager from '../packages/package-managers-local'

const webpackFS = new MemoryFileSystem()
const projectRoot = discoverRoot()

if (projectRoot === undefined) {
  console.error(`${chalk.red.inverse('FAIL')} ${chalk.blue('nom-scripts')} did not find a ${chalk.green('create-nom-app')} project.`)
  console.error('Did you run the script from the root directory of your create-nom-app?')

  process.exit(1)
}

const packageManager = whichManager(projectRoot)
const isProduction = false
const args = minimist(process.argv.slice(2))
const useWatch = args.once !== true

const statsHandler = (err, stats) => {
  console.log(`Compile your app for production with ${chalk.green(packageManager === 'yarn' ? 'yarn build' : 'npm run build')}.`)

  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
  }
}

function main() {
  const pkgPath = path.join(projectRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

  const compiler = webpack({
    context: projectRoot,
    entry: path.join(projectRoot, 'src', 'main.js'),
    mode: isProduction ? 'production' : 'development',
    optimization: {},
    target: 'node',
    externals: [nodeExternals()],
    devtool: isProduction ? false : 'inline-source-map',
    output: {
      filename: 'main.js',
      path: path.join(projectRoot, 'dist'),
      library: pkg.name,
      libraryTarget: 'umd',
      umdNamedDefine: true,
      // Issue described at https://github.com/webpack/webpack/issues/6525
      // Solution provided by https://github.com/webpack/webpack/issues/6522#issuecomment-371120689
      globalObject: 'typeof self !== \'undefined\' ? self : this'
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
    plugins: [
      new FriendlyErrorsWebpackPlugin()
    ]
  })

  compiler.outputFileSystem = webpackFS

  if (useWatch) {
    compiler.watch({
      ignored: ['node_modules']
    }, statsHandler)
  } else {
    compiler.run(statsHandler)
  }

  return undefined
}

main()
