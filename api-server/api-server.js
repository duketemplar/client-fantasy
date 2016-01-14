var koa = require('koa');
var mount = require('koa-mount');
var router = require('koa-router')();
var serve = require('koa-static');

var jsonFixtures = require('./fixtures/json-fixtures');

var ntagMiddleware = require('./middleware/ntag-middleware');
var authenticatedMiddleware = require('./middleware/authenticated-middleware');

var routes = require('./routes');
var pkg = require('./../package.json');

var app = koa();

router.post('/api/2/accounts/:accno/orders', routes.orders.enterOrder);

app
  .use(mount('/sc/', serve(__dirname + '/sc')))
  .use(mount('/now/', serve(__dirname + '/now')))
  .use(mount('/mux/', serve(__dirname + '/mux')))
  .use(mount('/api', ntagMiddleware))
  .use(mount('/api/2/accounts', authenticatedMiddleware))
  .use(jsonFixtures(__dirname + '/fixtures'))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(pkg.config.api_server.port);

console.log('listening on port ' + pkg.config.api_server.port);
