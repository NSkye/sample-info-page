'use strict'

const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  /**
   * There's no specification for entry point and output folder as they are by default src/index.js and dist/ respectively
   */
  module: {
    /**
     * File rules
     */
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
      /**
       * This rule will ensure that ESLint runs against every .js and .vue file before its being transformed and included in bundle
       */
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader'
        }]
      },
      /**
       * Place fonts in seperate directory within build
       */
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      },
      {
        test: /\.(gif|bmp|jpg|jpeg|svg|png)$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  resolve: {
    /**
     * Allows to import .js and .vue files without specifying extensions
     */
    extensions: ['.js', '.vue'],
    /**
     * Provides global paths for more convenient access to frequently used directories, 
     * e.g. for accessing libs folder from a component we can write just 'libs' instead of '../libs'
     * and to access any folder in src we now just simply have to type '@/[folder name]' instead of specifiying exact number of directories we have to go up
     */
    alias: {
      'components': path.resolve(__dirname, 'src/components'),
      'fonts': path.resolve(__dirname, 'src/fonts'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'config': path.resolve(__dirname, 'src/app.config.js'),
      'libs': path.resolve(__dirname, 'src/libs'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  /**
   * Enables hot module replacement for dev server
   */
  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: 3000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ]
}