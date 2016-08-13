'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var Promise = require('es6-promise').Promise;
var Webpack = require('webpack');
var sprintf = require('sprintf-js').sprintf;

var APP_NAME = 'Kalkulačka daně z příjmu';


module.exports = {
  context: __dirname + '/src',
  entry: './main',
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.json$/, loader: 'json'},
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
      sprintf('%s (build %s)', APP_NAME, new Date().toISOString())
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
