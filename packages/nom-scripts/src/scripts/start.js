import path from 'path'
import fs from 'fs-extra'
import chalk from 'chalk'
import webpack from 'webpack'
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin'

import discoverRoot from '../packages/discoverRoot'

const webpackFS = new MemoryFileSystem()
  const projectRoot = discoverRoot()

  if (projectRoot === undefined) {
    console.error(`${chalk.red.inverse('FAIL')} ${chalk.blue('nom-scripts')} did not find a ${chalk.green('create-nom-app')} project.`)
    console.error('Did you run the script from the root directory of your create-nom-app?')

    process.exit(1)
  }

  const pkgPath = path.join(projectRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))

  const compiler = webpack({
    entry: path.join(projectRoot, 'src', 'main.js'),
    mode: isProduction ? 'production' : 'development',
    optimization: {},
    target: 'node',
    devtool: isProduction ? undefined : 'inline-source-map',
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
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: ['message top'],
          notes: ['message bottom']
        }
      })
    ]
  })

  compiler.outputFileSystem = webpackFS

  compiler.watch({

  }, (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }

    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }
  })

  return undefined
}

main()
