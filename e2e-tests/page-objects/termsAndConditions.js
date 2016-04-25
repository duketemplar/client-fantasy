module.exports = (client) => {
  return {
    acceptTerms() {
      return client
        .click('#sign-read-agreement-and-conditions');
    },
  };
};
