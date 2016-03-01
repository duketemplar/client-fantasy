describe('Page', () => {
  // beforeEach((done) => {
  //   ssnpage.launchUrl();
  //   done();
  // });
  it('have 7 fields', (client) => {
    const ssnpage = client.page.ssn();
    ssnpage.launchUrl();
    // const test = client.expect.element('#crs-pop-up-app').to.be.present;
    console.log('test');
    ssnpage.passSsn()
  });

//     it('#crs-pop-up-app container is present',
//       (client) => client.expect.element('#crs-pop-up-app').to.be.present);
//
//     afterEach((client, done) => client.end(() => done()));
//   });
//
//   describe('displays accounts list', () => {
//     beforeEach((client, done) => {
//       login(client);
//       loadAccounts(client);
//       client.waitForElementVisible('.accounts-list .alias', 1000);
//       done();
//     });
//
//     it('accounts list is present',
//       (client) => client.expect.element('.accounts-list').to.be.present);
//     // it('alias is displayed',
//     //   (client) => client.expect.element('.accounts-list .alias').to.be.present);
//
//     afterEach((client, done) => client.end(() => done()));
//   });
// });
});
