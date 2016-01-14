var resolve = require('path').resolve;
var assert = require('assert');
var send = require('koa-send');
var _ = require('lodash');

module.exports = serve;

// Declare authenticated paths here
const loginRequiredPaths = [
  'accounts',
];

function serve(root, opts) {
  opts = opts || {};

  assert(root, 'root directory is required to serve files');

  const rootPath = resolve(root);

  function setLocale(){
    var locale = this.cookies.get('locale');
    var language, country;
    if (locale) {
      var tokens = locale.split('-');
      language = tokens[0];
      country = tokens[1];
    } else {
      language = 'sv';
      country = 'SE';
    }

    this.body = {language: language, country: country};
  }

  function isLoginRequired(path){
    return _.any(loginRequiredPaths, function(loginRequiredPath){
      return path.indexOf('/api/2/' + loginRequiredPath) !== -1;
    });
  }

  return function *serve(next){
    if (this.method == 'HEAD' || this.method == 'GET') {

      if (isLoginRequired(this.path)) {
        opts.root = rootPath + '/' + this.cookies.get('username');
        console.log("Login required for path: " + this.path)
      } else if (this.path.indexOf('/api/2/login') !== -1) {
        if (this.cookies.get('authenticated') === 'true') {
          opts.root = rootPath + '/' + this.cookies.get('username');
        } else {
          setLocale.apply(this);
          return;
        }
      } else {
        opts.root = rootPath + '/common';
      }

      // Need to url encode since koa-send always url decodes the path
      var queryStringPart = this.querystring ? encodeURIComponent(encodeURIComponent('?' + this.querystring)) : '';
      var path = this.path + queryStringPart + '.json';

      console.log("Serve file: " + opts.root + path);
      if (yield send(this, path, opts)) return;
    }

    yield* next;
  };
}
