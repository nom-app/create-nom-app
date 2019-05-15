import path from 'path'
import webpack from 'webpack'
import nodeExternals from 'webpack-node-externals'
import { name as libraryName } from './package.json'

const isProduction = process.env.NODE_ENV === 'production'

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
  externals: [nodeExternals()],
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
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node\n\n"use strict";\n', raw: true })
  ]
}
