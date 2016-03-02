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

    fillFields() {
      return client
      .waitForElementVisible('#webapp-customer-registration', 1500)
      .setValue('#first-name', 'Nancy')
      .setValue('#last-name', 'Crawford')
      // .setValue('#citizenship', 'first-name')
      .setValue('#c/o', 'Nancy Crawford')
      .setValue('#address', 'Testvägen 105')
      .setValue('#zip-code', '12458')
      .setValue('#city', 'Stockholm')
      .setValue('#country', 'Sweden')
      .setValue('#e-mail', 'konkar@nordnet.se');
      // client.click(#submit button goes here)
    },
  };
};
