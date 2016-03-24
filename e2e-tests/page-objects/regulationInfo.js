module.exports = (client) => {
  return {
    isObligatedOutSweden() {
      return client
        .click('.compliance__taxable-outside-jursdiction option[value=yes]');
    },

    isNotObligatedOutSweden() {
      return client
        .click('.compliance__taxable-outside-jursdiction option[value=no]');
    },

    isObligatedToUSA() {
      return client
        .click('.compliance__question_taxable-in-usa option[value=no]');
    },

    isNotObligatedToUSA() {
      return client
        .click('.compliance__question_taxable-in-usa option[value=yes]');
    },

    isEmployed() {
      return client
        .click('.compliance__employment-status option[value=employed]');
    },

    isUnemployed() {
      return client
        .click('.compliance__employment-status option[value=unemployed]');
    },

    isSelfEmployed() {
      return client
        .click(".compliance__employment-status option[value='self employed']");
    },

    hasLowIncome() {
      return client
        .click(".compliance__yearly-income option[value='0 - 100,000 SEK']");
    },

    hasNormalIncome() {
      return client
        .click(".compliance__yearly-income option[value='100,000 SEK - 500,000 SEK']");
    },

    hasHighIncome() {
      return client
        .click(".compliance__yearly-income option[value='500,000 SEK or more']");
    },

    isFinancialSafty() {
      return client
        .click('.compliance__anwser_financial-safety');
    },

    isPrivateConsumption() {
      return client
        .click('.compliance__anwser_private-consumption');
    },

    isForNextOfKin() {
      return client
        .click('.compliance__anwser_for-next-of-kin');
    },

    isPension() {
      return client
        .click('.compliance__anwser_pension');
    },

    isTrading() {
      return client
        .click('.compliance__anwser_trading');
    },

    inharitance() {
      return client
        .click('.compliance__funds-and-securities-originate option[value=inheritance]');
    },

    selfAcquired() {
      return client
        .click(".compliance__funds-and-securities-originate option[value='self acquired']");
    },

    depositsLow() {
      return client
        .click(".compliance__yearly-value-of-deposits option[value='0 - 100,000 SEK']");
    },

    depositsNormal() {
      return client
        .click(".compliance__yearly-value-of-deposits option[value='100,000 SEK - 500,000 SEK']");
    },

    depositsHigh() {
      return client
        .click(".compliance__yearly-value-of-deposits option[value='500,000 SEK or more']");
    },

    isPoliticallyExposed() {
      return client
      .click('.compliance__politically-exposed-in-other-nation option[value=yes]');
    },

    isNotPoliticallyExposed() {
      return client
      .click('.compliance__politically-exposed-in-other-nation option[value=no]');
    },
  };
};
