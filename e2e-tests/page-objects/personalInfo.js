module.exports = (client) => {
  return {
    insertPhone() {
      return client
      .waitForElementVisible('#prospect-phone-number .react-tel-input input', 1500)
      .setValue('#prospect-phone-number .react-tel-input input', '0762343684');
    },

    insertEmail() {
      return client
      .waitForElementVisible('#prospect-email', 1500)
      .setValue('#prospect-email', 'konkar@nordnet.se');
    },
  };
};
