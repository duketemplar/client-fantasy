/* eslint-env node */

var state = require('./state');

var GET = 'GET';

// next might change ntag less frequently
// this naive implementation does not handle concurrent requests
var ntagMiddleware = function *(next) {

  if (this.method !== GET && this.get('ntag') !== state.getCurrentNtag()) {
      this.throw(403, 'ntag does not match, got: ' + this.get('ntag') + ' current: ' + state.getCurrentNtag());
  }

  // ntag is set only once per session, should not change on every POST/PUT/DELETE request
  if (!state.getCurrentNtag()) {
    this.set('ntag', state.bumpNtag());
  } else if (this.method === GET) {
    this.set('ntag', state.getCurrentNtag());
  }

  yield next;
};

module.exports = ntagMiddleware;
