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
.post('/api/2/accounts/:accno/orders', routes.orders.enterOrder)
.post('/api/2/customers/prospects', routes.customerCreation.createProspect)
.put('/api/2/customers/prospects/:prospectId', routes.customerCreation.updateProspect)
.post('/api/2/customers/regulations', routes.customerRegulation.validateRegulation)
.post('/api/2/kyc/compliance', routes.kyc.compliance)
.post('/api/2/signicat/sign', routes.signicat.sign);

app
  .use(bodyParser())
  .use(mount('/sc/', serve(__dirname + '/sc')))
  .use(mount('/now/', serve(__dirname + '/now')))
  .use(mount('/mux/', serve(__dirname + '/mux')))
  .use(mount('/api', ntagMiddleware))
  .use(mount('/api/2/accounts', authenticatedMiddleware))
  .use(jsonFixtures(__dirname + '/fixtures'))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(pkg.config.api_server.port); // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
