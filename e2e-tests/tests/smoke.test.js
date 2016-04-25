describe('prospect', () => {
  it('becomes customer', (client) => {
    const identify = client.page.identify();
    const personalInfo = client.page.personalInfo();
    const regulationInfo = client.page.regulationInfo();
    const termsAndConditions = client.page.termsAndConditions();

    identify.goTo();
    identify.nationalRegistrationNumber('19640117-8600');
    identify.isUrl('begin', '.customer-registration');
    personalInfo.insertPhone();
    personalInfo.insertEmail();
    regulationInfo.isNotObligatedOutSweden();
    regulationInfo.isNotObligatedToUSA();
    regulationInfo.isEmployed();
    regulationInfo.hasNormalIncome();
    regulationInfo.isFinancialSafety();
    regulationInfo.selfAcquired();
    regulationInfo.depositsHigh();
    regulationInfo.isPoliticallyExposed();
    termsAndConditions.acceptTerms();
    identify.isUrl('mux/web/user/overview.html');

    client.end();
  });

  it('is crs/fatca obligated', (client) => {
    const identify = client.page.identify();
    const personalInfo = client.page.personalInfo();
    const regulationInfo = client.page.regulationInfo();
    const regulationInfoModal = client.page.regulationInfoModal();

    identify.goTo();
    identify.nationalRegistrationNumber('19640117-8600');
    personalInfo.insertPhone();
    personalInfo.insertEmail();
    regulationInfo.isNotObligatedOutSweden();
    regulationInfo.isObligatedToUSA();
    regulationInfoModal.doContinue();
    identify.isUrl('depa_typ=isk');

    client.end();
  });

  it('get oddity modal', (client) => {
    const identify = client.page.identify();

    identify.goTo();
    identify.nationalRegistrationNumber('196002054234');
    identify.getOddity();
    identify.isUrl('depa_typ=isk');

    client.end();
  });
});
