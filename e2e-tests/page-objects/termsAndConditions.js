module.exports = (client) => {
  return {
    acceptTerms() {
      return client
        .click('.terms-and-conditions__accept .checkbox__input');
    },

    doSigning() {
      return client
        .click('#sign-do-signing')
        .waitForElementVisible('.info-modal', 1500)
        .click('button.info-modal__continue');
    },
  };
};
