module.exports = (client) => {
  const url = '/sc/webapp-customer-registration/init/';
  const startpage = '/mux/login/startSE.html?cmpi=start-loggain';
  return {
    launchUrl() {
      client.url(client.launchUrl + startpage);
      client.waitForElementVisible()
      return client.url(client.launch_url + url)
                  .waitForElementVisible('#webapp-customer-registration', 1500);
        // const konkar = "https://nordnet.web-konkar.test.nordnet.se/sc/webapp-customer-registration/init/#/?_k=low7s2"
    },
    passSsn() {
      return function foo() {
        client.waitForElementVisible('#webapp-customer-registration', 1500);
        client.click('#national-registration-number');
        client.setValue('#national-registration-number', '195503034257');
        // client.click('here goes the submit button');
      };
    //   return client => {
    //     client.waitForElementVisible('#webapp-customer-registration', 1500);
    //     client.click('#national-registration-number');
    //     client.setValue('#national-registration-number', '195503034257');
    //     client.click('here goes the submit button');
    //   };
    },
    //
    // fillFields() {
    //   return client => {
    //     client.waitForElementVisible('#webapp-customer-registration', 1500);
    //     client.setValue(#,Test);
    //     client.setValue(#,);
    //     client.setValue(#,);
    //     client.setValue(#,);
    //     client.setValue(#,);
    //     client.click(#submit button goes here)
    //   };
    // },
  };
};
