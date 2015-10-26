console.log('ENV', process.env.NIGHTWATCH_ENV);

const url = ('dev' === process.env.NIGHTWATCH_ENV) ? '' : '/mux/web/nordnet/seed.html';

// How to debug:
// 1. Add logging, e.g.
//   client.getLogTypes(function(result) {
//    console.log('RESULT1', result);
//  }).getLog('browser', function(result) {
//      console.log('RESULT2', result);
//  });
// 2. Use firefox browser and pause the script, client.pause()
// 3. Use screenshots


const beforeEach = client => {
  client
    .url(client.launch_url + url)
    .waitForElementVisible('body', 1000);
};

const displaysPage = client => {
  client.waitForElementVisible('body', 1000);
  client.expect.element('#nordnet-react-app-light').to.be.present;
  client.end();
};

const displaysAccounts = client => {
  client.waitForElementVisible('select', 1000);
  client.waitForElementVisible('input', 1000);
  client.expect.element('#nordnet-react-app-light').to.be.present;
  client.expect.element('#login-container').to.be.present;
  client.assert.containsText('#login-container', 'Username');
  client.setValue('input[type=text]', 'stora');
  client.expect.element('button').to.be.present;
  client.click('select option[value="sv-SE"]');
  client.waitForElementVisible('select', 1000);
  client.click('button');
  client.waitForElementVisible('.accounts-list', 5000);
  client.expect.element('.accounts-list .alias').to.be.present;
  client.end();
};


export default {
  beforeEach,
  'Page loads': displaysPage,
  'Displays accounts': displaysAccounts,
};
