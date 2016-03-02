describe('User', () => {
  beforeEach((client, done) => {
    const nrnpage = client.page.nationalRegistrationNumber();
    nrnpage.goTo();
    done();
  });

  afterEach((client, done) => {
    client.end();
    done();
  });

  it('submits the national registrationn number', (client) => {
    const nrnpage = client.page.nationalRegistrationNumber();
    nrnpage.nationalRegistrationNumber('19640117-8600');
    client.pause(10000);
    nrnpage.isUrl('contact-info?_k');
  });
});
