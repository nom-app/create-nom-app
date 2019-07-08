module.exports = {
  presets: [
    ['@babel/preset-env']
  ],
  plugins: [
    'add-module-exports',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-transform-runtime'
  ]
}
