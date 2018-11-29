const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
console.log(process.env.NODE_ENV)
module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      //name对应入口文件中的名字，我们起的是jQuery
      name: ['vender'],
      //把文件打包到哪里，是一个路径
      //filename: "js/vender.js",
      //最小打包的文件模块数，这里直接写2就好
      minChunks: 2
    }),
    new CleanWebpackPlugin(['dist'], //匹配删除的文件
      {
        root: path.resolve(__dirname, '../'), //根目录
        verbose: true, //是否启用控制台输出信息
        dry: false, //设置为false,启用删除文件
      }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      minify: false,
      hash: process.env.NODE_ENV === 'production',
      chunksSortMode: "dependency"
      // inject:'head'
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].[chunkhash].css',
      disable: false
    }),
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // {
      //   test: /\.(gif|png|jpe?g|svg)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         publicPath: '/static/imgs/',
      //         outputPath: 'images/'
      //       }
      //     },
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         bypassOnDebug: true,
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      }
    ]
  }
}