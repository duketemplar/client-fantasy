function accountUrl(client) {
  const rootPage = (process.env.NIGHTWATCH_ENV === 'dev') ? '' : '/mux/web/nordnet/seed.html';
  return client.launch_url + rootPage;
}

export default (client) => {
  const url = accountUrl(client);

  return {
    url,
    gotoAccounts() {
      client.url(url);
      client.waitForElementVisible('body', 1000);
      client.expect.element('#nordnet-react-app-light').to.be.present;
    },

    // locale - e.g. sv-SE
    login(username, password, locale) {
      client.waitForElementVisible('select', 1000);
      client.waitForElementVisible('input', 1000);
      client.expect.element('#login-container').to.be.present;
      client.setValue('input[type=text]', username);
      client.expect.element('button').to.be.present;
      client.click(`select option[value="${locale}"]`);
      client.waitForElementVisible('select', 1000);
      client.click('button');
    },
  };
}
