'use strict'

const path = require('path')
const common = require('./common')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const pathsToClean = ['dist']
const cleanOptions = {
  root: path.join(__dirname, '../'),
  verbose: true,
  dry: false
}

module.exports = {
  mode: 'production',
  target: common.target,
  entry: common.entry,
  output: common.output,

  module: {
    rules: [
      common.jsLoader
    ]
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  },

  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  ].concat(common.plugins)
}
