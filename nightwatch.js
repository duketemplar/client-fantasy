require('babel/register');
var nightwatch = require('nightwatch');

var done = function() {};
var settings = {};

nightwatch.runner({ config: './nightwatch.json' }, done, settings);
