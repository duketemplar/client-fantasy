import Intl from 'intl';
import _ from 'lodash';

// some browsers does not impl. correctly Intl, try to override it
if (!window.Intl) {
  try {
    window.Intl = Intl; // eslint-disable-line no-native-reassign
    window.IntlPolyfill = Intl;
  } catch (err) {
    console.error('Failed to redefine Intl: ', err);
  }
}

const LOCALE_INITIALIZERS = {
  'sv-SE': ensuresvSE,
  'fi-FI': ensurefiFI,
  'sv-FI': ensuresvFI,
  'nb-NO': ensurenbNO,
  'no-NO': ensurenbNO,
  'nn-NO': ensurennNO,
  'da-DK': ensuredaDK,
  en: ensureen,
};

export function supportedLocales() {
  return _.keys(LOCALE_INITIALIZERS);
}

export function initializeLocale(locale) {
  const initializer = LOCALE_INITIALIZERS[locale];
  if (!initializer) {
    throw new Error(`Unknown locale "${locale}"`);
  }

  return thenify(initializer).then(() => locale);
}

function thenify(f) {
  return new Promise((resolve) => f(resolve));
}

function ensuresvSE(cb) {
  require.ensure([
    'intl/locale-data/jsonp/sv-SE.js',
  ], function resolved(require) {
    require('intl');
    require('intl/locale-data/jsonp/sv-SE.js');
    cb();
  });
}

function ensurefiFI(cb) {
  require.ensure([
    'intl/locale-data/jsonp/fi-FI.js',
  ], function resolved(require) {
    require('intl');
    require('intl/locale-data/jsonp/fi-FI.js');
    cb();
  });
}

function ensuresvFI(cb) {
  require.ensure([
    'intl/locale-data/jsonp/sv-FI.js',
  ], function resolved(require) {
    require('intl');
    require('intl/locale-data/jsonp/sv-FI.js');
    cb();
  });
}

function ensurenbNO(cb) {
  require.ensure([
    'intl/locale-data/jsonp/nb-NO.js',
  ], function resolved(require) {
    require('intl');
    require('intl/locale-data/jsonp/nb-NO.js');
    cb();
  });
}

function ensurennNO(cb) {
  require.ensure([
    'intl/locale-data/jsonp/nn-NO.js',
  ], function resolved(require) {
    require('intl');
    require('intl/locale-data/jsonp/nn-NO.js');
    cb();
  });
}

function ensuredaDK(cb) {
  require.ensure([
    'intl/locale-data/jsonp/da-DK.js',
  ], function resolved(require) {
    require('intl');
    require('intl/locale-data/jsonp/da-DK.js');
    cb();
  });
}

function ensureen(cb) {
  require.ensure([
    'intl/locale-data/jsonp/en.js',
  ], function resolved(require) {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    cb();
  });
}
