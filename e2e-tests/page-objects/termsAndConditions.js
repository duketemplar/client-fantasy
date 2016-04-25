module.exports = (client) => {
  return {
    acceptTerms() {
      return client
        .click('.terms-and-conditions__accept')
        .click('#sign-do-signing')
        .waitForElementVisible('.info-modal__continue', 1500)
        .click('button.info-modal__continue');
    },
  };
};
