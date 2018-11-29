const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = merge(common, {
  entry: {
    "app": './src/main.js',
    "vender":['./static/js/md5.js','jquery']
  },
  devtool: 'inline-source-map',
  devServer: {
    // contentBase: './dist',
    inline: true,
    port: 8000,
    open: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('dev')
      }
    })
  ],
  module:{
    rules:[
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '/static/imgs/',
              // outputPath: 'images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            }
          }
        ]
      },
    ]
  }
})
