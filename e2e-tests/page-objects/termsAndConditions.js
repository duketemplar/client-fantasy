module.exports = (client) => {
  return {
    acceptTerms() {
      return client
        .click('.terms-and-conditions__checkbox');
    },
  };
};
