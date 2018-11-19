const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require('compression-webpack-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  devtool: '',
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new OptimizeCSSAssetsPlugin({}),
    // new CompressionPlugin({ deleteOriginalAssets: true }),
  ],
});
