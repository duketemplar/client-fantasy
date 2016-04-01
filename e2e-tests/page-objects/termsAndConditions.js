module.exports = (client) => {
  return {
    acceptTerms() {
      return client
        .click('.checkbox__terms-and-conditions');
    },
  };
};
