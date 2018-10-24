const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index.js'),
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loaders: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url-loader?prefix=font/&limit=5000',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    hot: true,
    open: true,
    // noInfo: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['dist']),
    new webpack.LoaderOptionsPlugin({}),
    htmlPlugin,
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'node_modules'),
    },
    extensions: [".js", ".jsx"],
  },
};
