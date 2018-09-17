'use strict'

const path = require('path')
const { name } = require('../package.json')

module.exports = {
  target: 'web',

  entry: {
    app: './src/index.js'
  },

  output: {
    path: path.join(__dirname, '../', 'dist'),
    filename: path.join('js', `${name}.js`),
    publicPath: '/dist/',
    libraryTarget: 'var',
    library: 'FormValidate'
  },

  jsLoader: {
    test: /\.js$/,
    exclude: /node_modules/,
    use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }
  },

  plugins: []
}
