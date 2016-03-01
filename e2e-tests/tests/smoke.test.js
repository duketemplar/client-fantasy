describe('Social serurity number page', () => {
  beforeEach((client, done) => {
    const ssnpage = client.page.ssn();
    ssnpage.launchUrl();
    done();
  });

  afterEach((client, done) => {
    client.end();
    done();
  });

  it('takes ssn forward to contact info', (client) => {
    const ssnpage = client.page.ssn();
    ssnpage.passSsn('19640117-8600');
    // ssnpage.fillFields();
    client.pause(5000);
  });
});
