/* eslint-env node */

var GET = 'GET';

var authenticatedMiddleware = function *(next) {

  if (this.cookies.get('authenticated') !== 'true') {
      this.throw(JSON.stringify({ 'code': 'NEXT_INVALID_SESSION' }), 401);
  }

  yield next;
};

module.exports = authenticatedMiddleware;
