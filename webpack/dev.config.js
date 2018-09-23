'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const common = require('./common')

module.exports = {
  mode: 'development',
  target: common.target,
  devtool: 'source-map',
  entry: common.entry,
  output: common.output,

  module: {
    rules: [
      common.jsLoader
    ]
  },

  plugins: common.plugins.concat(
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './samples/index.html',
      inject: false
    })
  ),

  devServer: {
    contentBase: path.join(__dirname, '../', 'samples'),
    compress: true,
    watchContentBase: true,
    port: 3000
  }
}
