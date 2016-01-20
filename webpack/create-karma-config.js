const webpack = require('webpack');
const path = require('path');

const preLoadersForCodeCoverage = [
  {
    test: /\.jsx?$/,
    include: path.resolve('./src'),
    loader: 'isparta',
  },
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    query: {
        presets: ['react', 'es2015'],
    },
    exclude: [
      path.resolve('./src/'),
      path.resolve('./node_modules/'),
    ],
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
    exclude: /node_modules/,
  },
];

const loadersWithoutSourceMap = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  }, {
    test: /\.json$/,
    loader: 'json-loader',
    exclude: /node_modules/,
  },
];


function createKarmaConfig(config) {
  // We can't have both coverage and source map at the same time ...
  const preLoaders = config.coverage ? preLoadersForCodeCoverage : [];
  const loaders = config.coverage ? [] : loadersWithoutSourceMap;

  return {
    devtool: config.sourcemap ? 'inline-source-map' : '',
    module: {
      // don't run babel-loader through the sinon module
      noParse: [
        /node_modules\/sinon\//
      ],
      preLoaders: preLoaders,
      loaders: loaders,
    },
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/^test-helper$/, __dirname + '/../test-helper/'),
      new webpack.NormalModuleReplacementPlugin(/\.scss$/, __dirname + '/../test-helper/noop.js'),
      new webpack.NormalModuleReplacementPlugin(/\.css$/, __dirname + '/../test-helper/noop.js'),
      new webpack.NormalModuleReplacementPlugin(/\.svg$/, __dirname + '/../test-helper/noop.js'),
      new webpack.NormalModuleReplacementPlugin(/assets\//, __dirname + '/../test-helper/noop.js'),
    ],
    resolve: {
      alias: {
        'nordnet-i18n': path.join(__dirname, '../src/nordnet-i18n'),
        'nordnet-utils': path.join(__dirname, '../src/nordnet-utils'),
        'mock-login': path.join(__dirname, '../api-server/mock-login.jsx'),
        'sinon': 'sinon/pkg/sinon',
      },
      extensions: ['', '.js', '.json', '.jsx'],
    },
  };
}

module.exports = createKarmaConfig;
