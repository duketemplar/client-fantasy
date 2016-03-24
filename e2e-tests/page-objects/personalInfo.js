module.exports = (client) => {
  return {
    insertPhone() {
      return client
      .waitForElementVisible('#webapp-customer-registration', 1500)
      .setValue('#phone-number', '0762343684');
    },

    insertEmail() {
      return client
      .waitForElementVisible('#webapp-customer-registration', 1500)
      .setValue('#e-mail', 'konkar@nordnet.se');
    },
  };
};
