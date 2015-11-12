/*
 * How to debug nightwatch tests:
 * 1. Add logging, e.g.
 *   client.getLogTypes(function(result) {
 *    console.log(result);
 *  }).getLog('browser', function(result) {
 *      console.log(result);
 *  });
 * 2. Use real browser e.g. firefox browser (see nightwatch.json) and pause the script and pause the script: client.pause()
 * 3. Use screenshots, see nightwatch.json:
 *    "screenshots": {
 *      "enabled": true,
 *      "on_failure" : true,
 *      "on_error" : false,
 * 4. Use the Phantomjs REPL
 */

describe('Accounts', () => {
  describe('page loaded', () => {
    beforeEach((client, done) => {
      loadAccounts(client);
      done();
    });

    it('#nordnet-react-app-light container is present',
      (client) => client.expect.element('#nordnet-react-app-light').to.be.present);

    afterEach((client, done) => client.end(() => done()));
  });

  describe('displays accounts list', () => {
    beforeEach((client, done) => {
      login(client);
      loadAccounts(client);
      done();
    });

    it('accounts list is present',
      (client) => client.expect.element('.accounts-list').to.be.present);
    it('alias is displayed',
        (client) => client.expect.element('.accounts-list .alias').to.be.present);

    afterEach((client, done) => client.end(() => done()));
  })
});

function loadAccounts(client) {
  const accounts = client.page.accounts();
  accounts.gotoAccounts();
}

function login(client) {
  const login = client.page.login();
  login.goTo();
  login.login();
}
