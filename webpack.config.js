'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var Promise = require('es6-promise').Promise;
var Webpack = require('webpack');

var APP_NAME = 'Kalkulačka daně z příjmů fyzických osob';


module.exports = {
  context: __dirname + '/src',
  entry: './main',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      { test: /\.css$/, use: ['style-loader', 'css-loader']},
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
      { test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)(\?.*)?$/, loader: 'file-loader', options: { name: '[path][name].[ext]' } },
    ],
  },
  resolve: {
    modules: ['node_modules', 'src'],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      },
      APP_NAME: JSON.stringify(APP_NAME),
    }),
    new Webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
    }),
    new Webpack.BannerPlugin(
      `${APP_NAME} (build ${new Date().toISOString()})`
    ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      title: APP_NAME,
    }),
  ],
  devServer: {
    inline: true,
    contentBase: 'dist'
  }
};
