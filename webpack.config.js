'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var Promise = require('es6-promise').Promise;
var UnderscoreString = require('underscore.string');
var Webpack = require('webpack');

var APP_NAME = 'Kalkulačka příjmů';


module.exports = {
  context: __dirname + '/src',
  entry: './main',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules\/(?!qs)/, loader: 'babel'},
      { test: /\.css$/, loader: 'style!css'},
      { test: /\.less$/, loader: 'style!css!less'},
      { test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)(\?.*)?$/, loader: 'file?name=[path][name].[ext]' },
    ],
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
  },
  plugins: [
    new Webpack.DefinePlugin({
      APP_NAME: JSON.stringify(APP_NAME),
    }),
    new Webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
    }),
    new Webpack.BannerPlugin(
      UnderscoreString.sprintf('%s (build %s)', APP_NAME, new Date().toISOString())
    ),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      title: APP_NAME,
    }),
  ],
  devServer: {
    inline: true,
    contentBase: 'dist'
  }
};
