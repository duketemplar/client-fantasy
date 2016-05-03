var resolve = require('path').resolve;
var assert = require('assert');
var send = require('koa-send');

module.exports = serve;

// Declare authenticated paths here
const loginRequiredPaths = [
  'accounts',
];

function serve(root, opts) {
  opts = opts || {};

  assert(root, 'root directory is required to serve files');

  const rootPath = resolve(root);

  function isLoginRequired(path){
    var index = loginRequiredPaths.findIndex(function(loginRequiredPath){
      return path.indexOf('/api/2/' + loginRequiredPath) !== -1;
    });

    return index !== -1;
  }

  return function *serve(next){
    if (this.method == 'HEAD' || this.method == 'GET') {

      var root = '/common';
      if ((isLoginRequired(this.path)) ||
        (this.path.indexOf('/api/2/login') !== -1 && this.cookies.get('authenticated') === 'true')) {
          root = '/' + this.cookies.get('username');
      }

      opts.root = rootPath + root;

      // Need to url encode since koa-send always url decodes the path
      var queryStringPart = this.querystring ? encodeURIComponent(encodeURIComponent('?' + this.querystring)) : '';
      var path = this.path + queryStringPart + '.json';

      console.log("Serve file: " + opts.root + path);
      if (yield send(this, path, opts)) return;
    }

    yield* next;
  };
}
