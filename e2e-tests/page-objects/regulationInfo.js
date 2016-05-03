module.exports = (client) => {
  return {
    isObligatedOutSweden() {
      return client
        .click('.compliance__question__taxable-outside-jursdiction option[value=yes]');
    },

    isNotObligatedOutSweden() {
      return client
        .click('.compliance__question__taxable-outside-jursdiction option[value=no]');
    },

    isObligatedToUSA() {
      return client
        .click('.compliance__question__taxable-in-usa option[value=yes]')
        .waitForElementPresent('.info-modal__container', 1500);
    },

    isNotObligatedToUSA() {
      return client
        .click('.compliance__question__taxable-in-usa option[value=no]');
    },

    isEmployed() {
      return client
        .click('.compliance__question__employment-status option[value=employed]');
    },

    isUnemployed() {
      return client
        .click('.compliance__question__employment-status option[value=unemployed]');
    },

    isSelfEmployed() {
      return client
        .click(".compliance__question__employment-status option[value='self employed']");
    },

    hasLowIncome() {
      return client
        .click(".compliance__question__yearly-income option[value='0 - 100,000 SEK']");
    },

    hasNormalIncome() {
      return client
        .click(".compliance__question__yearly-income option[value='100,000 SEK - 500,000 SEK']");
    },

    hasHighIncome() {
      return client
        .click(".compliance__question__yearly-income option[value='500,000 SEK or more']");
    },

    isFinancialSafety() {
      return client
        .click('.compliance__anwser__financial-safety .checkbox__input');
    },

    isPrivateConsumption() {
      return client
        .click('.compliance__anwser__private-consumption .checkbox__input');
    },

    isForNextOfKin() {
      return client
        .click('.compliance__anwser__for-next-of-kin .checkbox__input');
    },

    isPension() {
      return client
        .click('.compliance__anwser__pension .checkbox__input');
    },

    isTrading() {
      return client
        .click('.compliance__anwser__trading .checkbox__input');
    },

    inharitance() {
      return client
        .click('.compliance__question__funds-and-securities-originate option[value=inheritance]');
    },

    selfAcquired() {
      return client
        .click(".compliance__question__funds-and-securities-originate option[value='self acquired']");
    },

    depositsLow() {
      return client
        .click(".compliance__question__yearly-value-of-deposits option[value='0 - 100,000 SEK']");
    },

    depositsNormal() {
      return client
        .click(".compliance__question__yearly-value-of-deposits option[value='100,000 SEK - 500,000 SEK']");
    },

    depositsHigh() {
      return client
        .click(".compliance__question__yearly-value-of-deposits option[value='500,000 SEK or more']");
    },

    isPoliticallyExposed() {
      return client
      .click('.compliance__question__politically-exposed-in-other-nation option[value=yes]');
    },

    isNotPoliticallyExposed() {
      return client
      .click('.compliance__question__politically-exposed-in-other-nation option[value=no]');
    },
  };
};
