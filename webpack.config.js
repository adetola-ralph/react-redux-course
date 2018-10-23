const webpack = require('webpack');
const path = require('path');

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
        test: /\.jsx$/,
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        loaders: ['babel', 'eslint'],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url?prefix=font/&limit=5000',
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    hot: true,
    open: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
};
