import basePath from '../utils/enviroment';

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
        .setValue('#national-registration-number', 'potato')
        .waitForElementVisible('.input--has-error', 1500)
        .clearValue('#national-registration-number')
        .setValue('#national-registration-number', number)
        .waitForElementVisible('.input--has-success', 1500)
        .click('button.identify__submit');
    },

    isUrl(url) {
      return client
        .assert.urlContains(url);
    },
  };
};
