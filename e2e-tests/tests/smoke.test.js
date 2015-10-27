// How to debug nightwatch tests:
// 1. Add logging, e.g.
//   client.getLogTypes(function(result) {
//    console.log(result);
//  }).getLog('browser', function(result) {
//      console.log(result);
//  });
// 2. Use real browser e.g. firefox browser (see nightwatch.json) and pause the script and pause the script: client.pause()
// 3. Use screenshots, see nightwatch.json:
//    "screenshots": {
//      "enabled": true,
//      "on_failure" : true,
//      "on_error" : false,
// 4. Use the Phantomjs REPL

const displaysPage = client => {
  // GIVEN, WHEN
  client.page.accounts().gotoAccounts();

  // THEN
  client.expect.element('#nordnet-react-app-light').to.be.present;
  client.end();
};

const displaysAccounts = client => {
  // GIVEN
  const accounts = client.page.accounts();

  // WHEN
  accounts.gotoAccounts();
  accounts.login();
  client.waitForElementVisible('.accounts-list', 5000);

  // THEN
  client.expect.element('.accounts-list .alias').to.be.present;
  client.end();
};

export default {
  'Page loads': displaysPage,
  'Login and displays accounts': displaysAccounts,
};
