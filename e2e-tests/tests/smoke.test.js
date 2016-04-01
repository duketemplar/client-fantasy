describe('user', () => {
  it('becomes customer', (client) => {
    const identify = client.page.identify();
    const personalInfo = client.page.personalInfo();
    const regulationInfo = client.page.regulationInfo();
    const termsAndConditions = client.page.termsAndConditions();

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
    termsAndConditions.acceptTerms();

    client.end();
  });
});
