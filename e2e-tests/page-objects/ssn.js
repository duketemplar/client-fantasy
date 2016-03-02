module.exports = (client) => {
  const url = '/sc/webapp-customer-registration/init/#/';
  return {
    launchUrl() {
      return client
        .url(client.launch_url + url)
        .waitForElementVisible('#webapp-customer-registration', 1500);
    },

    passSsn(Ssn) {
      return client
      .waitForElementVisible('#webapp-customer-registration', 1500)
      .click('#national-registration-number')
      .setValue('#national-registration-number', Ssn)
      .pause(2000)
      .click('button.identify__submit');
    },
  };
};
