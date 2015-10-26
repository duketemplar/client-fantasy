var path = require('path');
var util = require('util');
var autoprefixer = require('autoprefixer-core');
var pkg = require('./../package.json');

var externals = require('./externals');
var loaders = require('./loaders');
var plugins = require('./plugins');

var DEBUG = process.env.NODE_ENV === 'development';
var VERSION = process.env.VERSION || 'dev';
var publicPath = DEBUG ? '/' : '/sc/' + pkg.name + '/cache/' + VERSION;

var entry = {
  index: ['./index.jsx']
};

if (DEBUG) {
  entry.index.push(
    util.format(
      'webpack-dev-server/client?http://%s:%d',
      pkg.config.dev_server.host,
      pkg.config.dev_server.port
    )
  );
  entry.index.push('webpack/hot/dev-server');
}

var config = {
  context: path.join(__dirname, './../src'),
  cache: DEBUG,
  debug: DEBUG,
  target: 'web',
  devtool: DEBUG ? 'inline-source-map' : 'hidden-source-map',
  entry: entry,
  output: {
    path: DEBUG ? path.resolve(pkg.config.dist) : path.resolve(pkg.config.dist + '/cache/' + VERSION),
    publicPath: DEBUG ? '/' : publicPath + '/',
    sourceMapFilename: './../../dev/[file].map',
    filename: '[name].js',
    pathinfo: DEBUG
  },
  module: {
    loaders: loaders
  },
  externals: externals,
  postcss: [
    autoprefixer
  ],
  plugins: plugins,
  resolve: {
    alias: {
      'nordnet-i18n': path.join(__dirname, './../src/nordnet-i18n'),
      'mock-login': path.join(__dirname, './../api-server/mock-login.jsx'),
    },
    extensions: ['', '.js', '.json', '.jsx'],
  },
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join(__dirname, './../src'),
    hot: true,
    noInfo: false,
    inline: true,
    proxy: {
      '/mux/*': 'http://' + pkg.config.api_server.host + ':' + pkg.config.api_server.port,
      '/now/*': 'http://' + pkg.config.api_server.host + ':' + pkg.config.api_server.port,
      '/sc/*': 'http://' + pkg.config.api_server.host + ':' + pkg.config.api_server.port,
      '/next/2/*': 'http://' + pkg.config.api_server.host + ':' + pkg.config.api_server.port
    },
    stats: {
      colors: true
    }
  }
};

module.exports = config;
