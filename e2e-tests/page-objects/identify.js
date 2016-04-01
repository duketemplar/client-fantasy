var basePath = require('../utils/enviroment');

module.exports = (client) => {
  return {
    goTo() {
      return client
        .url(client.launch_url + basePath(client.launch_url))
        .waitForElementVisible('#webapp-customer-registration', 1500);
    },

    nationalRegistrationNumber(number) {
      return client
        .waitForElementVisible('#webapp-customer-registration', 1500)
        .click('#national-registration-number')
        .setValue('#national-registration-number', number)
        .click('button.identify__submit');
    },

    isUrl(url) {
      return client
        .waitForElementVisible('.grid__col--xs-12', 1500)
        .assert.urlContains(url);
    },
  };
};
