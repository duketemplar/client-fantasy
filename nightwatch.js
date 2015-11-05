process.env.BABEL_CACHE_PATH = process.env.PWD + '/.babel.json'
require('babel/register');
const Nightwatch = require('nightwatch');

try {
  Nightwatch.cli(function(argv) {
    Nightwatch.runner(argv);
  });
} catch (ex) {
  Logger.error('There was an error while starting the test runner:\n\n');
  process.stderr.write(ex.stack + '\n');
  process.exit(2);
}
