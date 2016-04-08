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

    isUrl(className, url) {
      return client
        .waitForElementVisible(className, 1500)
        .assert.urlContains(url);
    },

    getOddity() {
      return client
        .waitForElementVisible('.info-modal', 1500)
        .click('button.info-modal__continue');
    },
  };
};
