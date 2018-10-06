'use strict'

const path = require('path')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  /**
   * Entry point и output не указываем, т.к. по умолчанию, они и так src/index.js и dist/
   */
  module: {
    /**
     * Правила загрузчиков
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
       * Это правило нужно, чтобы ESLint проверил каждый .vue и .js файл прежде чем он будет обработан другими загрузчиками
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
     * Позволяет импортировать .js и .vue файлы без указания расширения
     */
    extensions: ['.js', '.vue'],
    /**
     * Позволяет проще получать доступ к наиболее используемым папкам, 
     * например, чтоб получить доступ к папке libs из компонента достаточно написать 'libs' вместо '../libs'
     * и чтобы получить доступ к любой папке в src, достаточно набрать '@/[название папки]'
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