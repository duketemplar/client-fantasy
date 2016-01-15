/*
 * Main application file, defined as an entry point in webpack config (see webpack/config.js)
 */

// importing Babel polyfills to emulate full ES6 environment
// See https://babeljs.io/docs/usage/polyfill/
import 'babel-polyfill';

// importing styles that apply globally on the application level
import 'normalize.css/normalize.css';
import './assets/styles/app.scss';

// using ES6 native promises and enabling polyfill if native Promises are not supported
// See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
import es6promise from 'es6-promise';
es6promise.polyfill();

import React from 'react';

// importing localization support, using alias for nordnet-i18n which is configured in webpack (see webpack/conifg.js)
import i18n from 'nordnet-i18n';

// import loader of supported l10n files in the l10n folder.
import l10nLoader from './l10n-loader';

// importing application root component
import root from './root';

/*
 * Application start-up and initialization.
 * Ensures that application is loaded with correct localization - loads language and country from nExt API,
 * if those are not defined on the container element via data attributes (data-lang and data-country).
 * Once locale is resolved l10nLoader() loads appropriate localization and root component is rendered.
 *
 * Initialization function is saved on the global window.Nordnet object. Initialization is triggered when application is fully loaded on the page.
 * See index.html for more details.
 */
function initialize(element) {
  console.log('starting Initialization');
  try {
    i18n
      .initialize(element)
      .then(l10nLoader)
      .then(root.bind(null, element));
  } catch (e) {
    // TODO send error report to the server
  }
}

// ensures that 'Nordnet' object is defined in the global scope
if (!window.Nordnet) {
  window.Nordnet = {};
}

// saves 'initialize' function in the global scope as part of 'Nordnet' object.
// REPLACE 'nordnet-react-app-light' with your application name.
window.Nordnet['nordnet-react-app-light'] = initialize;

// injects mock login element on the page when running in development mode
/*eslint-disable */
if (DEBUG) {
  require('mock-login');
}
/*eslint-enable */
