module.exports = (client) => {
  const url = '/sc/webapp-customer-registration/init/#/';

  return {
    goTo() {
      return client
        .url(client.launch_url + url)
        .waitForElementVisible('#webapp-customer-registration', 1500);
    },

    nationalRegistrationNumber(Ssn) {
      return client
      .waitForElementVisible('#webapp-customer-registration', 1500)
      .click('#national-registration-number')
      .setValue('#national-registration-number', Ssn)
      .click('button.identify__submit');
    },

    isUrl(url) {
      return client
        .assert.urlContains(url);
    },
  };
};
