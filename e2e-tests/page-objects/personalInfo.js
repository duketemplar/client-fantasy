module.exports = (client) => {
  return {
    insertPhone() {
      return client
      .waitForElementVisible('.prospect__input_phone', 1500)
      .setValue('#phone-number', '0762343684');
    },

    insertEmail() {
      return client
      .waitForElementVisible('.prospect__input_email', 1500)
      .setValue('#e-mail', 'konkar@nordnet.se');
    },
  };
};
