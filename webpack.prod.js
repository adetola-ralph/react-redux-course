const merge = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common');

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    htmlPlugin,
    new CleanWebpackPlugin(['dist']),
  ]
});
