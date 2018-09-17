'use strict'

const path = require('path')
const common = require('./common')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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

  plugins: common.plugins.concat(
    new CleanWebpackPlugin(pathsToClean, cleanOptions)
  )
}
