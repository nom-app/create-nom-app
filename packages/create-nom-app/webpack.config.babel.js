import path from 'path'
import fs from 'fs'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import { name as libraryName } from './package.json'

const isProduction = process.env.NODE_ENV === 'production'
const shebangNode = '#!/usr/bin/env node'

process.stdout.write(`\nisProduction: ${isProduction}\n`)

export default {
  entry: path.join(__dirname, 'src', 'index.js'),
  mode: isProduction ? 'production' : 'development',
  optimization: {
    minimize: true
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
    }),
    (context, request, callback) => {
      if (/package\.json/.test(request)) {
        return callback(null, `require("${request}")`)
      }

      callback()
    }
  ],
  output: {
    filename: libraryName,
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
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  plugins: [
    new webpack.BannerPlugin({ banner: `${shebangNode}\n\n"use strict";\n`, raw: true }),
    // TODO: Move hook into own module.
    {
      apply: compiler => {
        // This hook changes the permissions of the outputted
        compiler.hooks.afterEmit.tap('BinaryPermissionsPlugin', compilation => {
          Object.keys(compilation.assets).forEach(key => {
            const assetName = key
            const asset = compilation.assets[key]

            if (typeof asset.children?.[0] !== 'string') {
              return
            }
            // Detects if an asset is likely supposed to be a binary file. The
            // shebang string `shebangNode` should have been set by the
            // BannerPlugin. If set correctly then `shebangNode` should be at
            // `assets.children[0]`.
            const likelyBinary = asset.children[0].includes(shebangNode)

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
