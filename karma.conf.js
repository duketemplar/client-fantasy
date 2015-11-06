
require('karma-common-js');
const createKarmaConfig = require('./webpack/create-karma-config');

function hasConfig(key) {
  return !!(process.env.npm_package_config_node_env && process.env.npm_package_config_node_env.indexOf(key) !== -1);
}

const sourcemap = hasConfig('sourcemap');

// We can't have both coverage and source map at the same time...
const envConfig = {
  sourcemap: sourcemap,
  coverage: !sourcemap,
};

const webpackConf =  createKarmaConfig(envConfig);

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
      'tests.webpack.js': envConfig.sourcemap ? ['webpack', 'sourcemap'] : ['webpack'],
    },
    reporters: envConfig.coverage ? ['mocha', 'junit', 'coverage'] : ['mocha', 'junit'],

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
    webpack: webpackConf,
    webpackServer: {
      noInfo: true, //please don't spam the console when running in karma!
    },
  });
};
