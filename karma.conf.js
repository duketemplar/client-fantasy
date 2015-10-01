const webpack = require('webpack');
const path = require('path');

require('karma-common-js');

const RUN_FAST = process.env.KARMA_ENV === 'fast';

console.log('RUN_FAST: ' + RUN_FAST);

module.exports = function(config) {
  config.set({

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],

    // make it possible to debug test in chrome
    browserNoActivityTimeout: 3000000,

    // https://github.com/kastork/react-karma-rewire-webpack
    singleRun: true, //just run once by default

    frameworks: ['mocha', 'chai-sinon'], //use the mocha test framework

    files: [
      'tests.webpack.js', //just load this file
    ],
    preprocessors: {
      'tests.webpack.js': RUN_FAST ? ['webpack'] : ['webpack', 'sourcemap'], //preprocess with webpack and a sourcemap loader
    },
    reporters: RUN_FAST ? ['mocha'] : ['mocha', 'junit', 'coverage'],

    coverageReporter: {
      dir: 'reports/coverage',
      reporters: [
        {
          type: 'text-summary',
        },
        {
          type: 'html',
          subdir: 'html',
          includeAllSources: true,
        },
        {
          type: 'cobertura',
          subdir: 'cobertura',
        },
      ],
    },

    junitReporter: {
      outputDir: __dirname + '/reports',
      outputFile: '../test-results.xml', // Make jenkins happy (but maybe we want to run multiple browsers so we should have several test results file)
      suite: '',
    },

    // see https://github.com/webpack/karma-webpack/issues/23
    webpack: { //kind of a copy of your webpack config
      devtool: RUN_FAST ? '' : 'inline-source-map', //just do inline source maps instead of the default
      module: {
        preLoaders: RUN_FAST ? [] : [
          {
            test: /\.jsx?$/,
            include: path.resolve('src'),
            loader: 'isparta',
          },
        ],
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          }, {
            test: /\.json$/,
            loader: 'json-loader',
            exclude: /node_modules/,
          },
        ],
      },
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/^test-helper$/, __dirname + '/test-helper/'),
        new webpack.NormalModuleReplacementPlugin(/\.scss$/, __dirname + '/test-helper/noop.js'),
        new webpack.NormalModuleReplacementPlugin(/\.css$/, __dirname + '/test-helper/noop.js'),
        new webpack.NormalModuleReplacementPlugin(/\.svg$/, __dirname + '/test-helper/noop.js'),
        new webpack.NormalModuleReplacementPlugin(/assets\//, __dirname + '/test-helper/noop.js'),
      ],
      resolve: {
        alias: {
          'nordnet-i18n': path.join(__dirname, './src/nordnet-i18n'),
          'nordnet-utils': path.join(__dirname, './src/nordnet-utils'),
          'mock-login': path.join(__dirname, './api-server/mock-login.jsx'),
        },
        extensions: ['', '.js', '.json', '.jsx'],
      },
    },
    webpackServer: {
      noInfo: true, //please don't spam the console when running in karma!
    },
  });
};
