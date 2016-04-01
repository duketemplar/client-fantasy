describe('user', () => {
  it('becomes customer', (client) => {
    const personalInfo = client.page.personalInfo();
    const regulationInfo = client.page.regulationInfo();
    const accountType = client.page.accountType();
    const termsAndConditions = client.page.termsAndConditions();
    const identify = client.page.identify();
    identify.goTo();
    identify.nationalRegistrationNumber('19640117-8600');
    identify.isUrl('begin');
    personalInfo.insertPhone();
    personalInfo.insertEmail();
    regulationInfo.isNotObligatedOutSweden();
    regulationInfo.isNotObligatedToUSA();
    regulationInfo.isEmployed();
    regulationInfo.hasNormalIncome();
    regulationInfo.isFinancialSafty();
    regulationInfo.selfAcquired();
    regulationInfo.depositsHigh();
    regulationInfo.isPoliticallyExposed();
    accountType.pickKF();
    termsAndConditions.acceptTerms();

    client.end();
  });
});
