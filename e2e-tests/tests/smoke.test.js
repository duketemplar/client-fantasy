describe('Social serurity number page', () => {
  beforeEach((client, done) => {
    const nrnpage = client.page.nationalRegistrationNumber();
    nrnpage.goTo();
    done();
  });

  afterEach((client, done) => {
    client.end();
    done();
  });

  it('takes ssn forward to contact info', (client) => {
    const nrnpage = client.page.nationalRegistrationNumber();
    nrnpage.nationalRegistrationNumber('19640117-8600');
  });
});
