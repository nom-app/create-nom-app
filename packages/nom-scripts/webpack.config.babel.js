import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import CopyPlugin from 'copy-webpack-plugin'
import CopyPluginPermissionFix from 'webpack-permissions-plugin'
import { name as libraryName } from './package.json'

const isProduction = process.env.NODE_ENV === 'production'
const shebangNode = '#!/usr/bin/env node'

process.stdout.write(`\nisProduction: ${isProduction}\n`)

export default {
  entry: {
    'nom-scripts': path.join(__dirname, 'src', 'index.js'),
    'scripts/start': path.join(__dirname, 'src', 'scripts', 'start.js'),
    'scripts/test': path.join(__dirname, 'src', 'scripts', 'test.js'),
    'scripts/build': path.join(__dirname, 'src', 'scripts', 'build.js'),
    'scripts/init': path.join(__dirname, 'src', 'scripts', 'init.js'),
    'scripts/eject': path.join(__dirname, 'src', 'scripts', 'eject.js')
  },
  mode: isProduction ? 'production' : 'development',
  optimization: {
    // minimize: true
  },
  devtool: isProduction ? undefined : 'inline-source-map',
  // target and externals because
  // https://www.npmjs.com/package/webpack-node-externals
  target: 'node',
  node: {
    // https://github.com/webpack/webpack/issues/1599#issuecomment-186841345
    __dirname: false,
    __filename: false
  },
  externals: [
    nodeExternals(),
    // Monorepo support. See https://github.com/liady/webpack-node-externals/issues/39#issuecomment-356647854
    nodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules')
    })
  ],
  output: {
    filename: (chunkData) => {
      const chunkName = chunkData.chunk.name
      const forceExtension = true
      return chunkName === libraryName && forceExtension !== true ? libraryName : '[name].js'
    },
    path: path.join(__dirname, 'bin'),
    library: 'createNomApp',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            configFile: path.join(__dirname, '.eslintrc.js')
          }
        }
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: `${shebangNode}\n"use strict";\n`, raw: true }),
    // copy-webpack-plugin does not preserve file permissions when copying
    // files. See more at
    // https://github.com/webpack-contrib/copy-webpack-plugin/issues/35
    new CopyPlugin([
      {
        from: path.join(__dirname, 'src', 'templates'),
        to: path.join(__dirname, 'bin', 'templates')
      }
    ]),
    new CopyPluginPermissionFix({
      buildFolders: [{
        path: path.resolve(__dirname, 'bin/templates'),
        dirMode: '775',
        fileMode: '664'
      }]
    }),
    // TODO: Move hook into own module.
    {
      apply: (compiler) => {
        // This hook changes the permissions of the outputted
        compiler.hooks.afterEmit.tap('BinaryPermissionsPlugin', (compilation) => {
          Object.keys(compilation.assets).forEach((key) => {
            const assetName = key
            const asset = compilation.assets[key]
            const assetContent = process.env.NODE_ENV === 'production' ? asset._value : asset.children?.[0]._value

            if (typeof assetContent !== 'string') {
              return
            }
            // Detects if an asset is likely supposed to be a binary file. The
            // shebang string `shebangNode` should have been set by the
            // BannerPlugin. If set correctly then `shebangNode` should be at
            // `assets.children[0]`.
            const likelyBinary = assetContent.includes(shebangNode)

            if (!likelyBinary) {
              console.log(`The asset "${assetName}" does not look like a binary file.`)
              console.log(`Ignoring setting permissions for ${assetName}.`)
              return
            }

            const assetPath = asset.existsAt
            const assetExistsAtType = typeof assetPath

            if (assetExistsAtType !== 'string') {
              console.log(`The afterEmit hook for asset "${assetName}" does not contain a valid "existsAt" key.`)
              console.log(`The "existsAt" key should be a string. Instead, got "${assetExistsAtType}".`)
              return
            }

            try {
              const setMode = '0775'
              fs.chmodSync(assetPath, setMode)

              // In some non-*nix environments (we are only checking for Windows
              // environments, right now), it is not possible to change all
              // permissions to how we like. Returning now before we fail the
              // file `mode` check.
              if (process.platform === 'win32') {
                return
              }

              const stats = fs.statSync(assetPath)
              const mode = stats.mode.toString(8)
              const expectedMode = `10${setMode}`
              if (mode !== expectedMode) {
                throw new Error(`Expected the stat of ${assetName} to be ${expectedMode}. Instead got ${mode}.`)
              }
            } catch (error) {
              console.error(`Error with changing the access level for the asset: ${assetName}`)
              console.error(error)

              // If in production mode, fail. We don't want to ship a
              // non-executable file.
              if (isProduction) {
                process.exit(1)
              }
            }
          })
        })
      }
    }
  ]
}
