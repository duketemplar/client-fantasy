const koa = require('koa');
const mount = require('koa-mount');
const router = require('koa-router')();
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

const jsonFixtures = require('./fixtures/json-fixtures');

const ntagMiddleware = require('./middleware/ntag-middleware');
const authenticatedMiddleware = require('./middleware/authenticated-middleware');

const routes = require('./routes');
const pkg = require('./../package.json');

const app = koa();

router
.post('/next/2/accounts/:accno/orders', routes.orders.enterOrder)
.post('/next/2/customer-creation/registrations', routes.customerCreation.registrations);

app
  .use(bodyParser())
  .use(mount('/sc/', serve(__dirname + '/sc')))
  .use(mount('/now/', serve(__dirname + '/now')))
  .use(mount('/mux/', serve(__dirname + '/mux')))
  .use(mount('/next', ntagMiddleware))
  .use(mount('/next/2/accounts', authenticatedMiddleware))
  .use(jsonFixtures(__dirname + '/fixtures'))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(pkg.config.api_server.port);
