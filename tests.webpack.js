// make phantomjs happy, polyfill .bind etc...
require('es5-shim');

// Don't use native promises on Chrome since testing then will be harder using sinon.clock
global.Promise = require('es6-promise-polyfill').Promise;

global.Intl = require('intl');
require('intl/locale-data/jsonp/sv-SE.js');
require('intl/locale-data/jsonp/en.js');
require('intl/locale-data/jsonp/fi-FI.js');
require('intl/locale-data/jsonp/sv-FI.js');
require('intl/locale-data/jsonp/nb-NO.js');
require('intl/locale-data/jsonp/nn-NO.js');
require('intl/locale-data/jsonp/da-DK.js');

var chai = require('chai');
var dirtyChai = require('dirty-chai');
var sinonChai = require('sinon-chai');
chai.use(dirtyChai);
chai.use(sinonChai);

// see http://chaijs.com/guide/styles/
chai.config.truncateThreshold = 0;

const context = require.context('./src', true, /\.test.js/);
context.keys().forEach(context);
