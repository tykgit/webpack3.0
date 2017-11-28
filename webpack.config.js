const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathsToClean = [
  'dist',
]

module.exports = {
  entry: {
    "app.bundle": './src/app.js',
    "contact": './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  devServer: {
    port: 9000,
    open: true
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      excludeChunks: ['contact']
    }),
    new HtmlWebpackPlugin({
      template: './src/contact.html',
      filename: 'contact.html',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      chunks: ['contact']
    }),
    new ExtractTextPlugin('style.css')
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  }
};
