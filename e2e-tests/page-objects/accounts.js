const devMode = process.env.NIGHTWATCH_ENV === 'dev';

function accountUrl(client) {
  // if you want to debug production environment from your local machine:
  // return 'https://nordnet.webfront1.ci.nordnet.se/mux/web/nordnet/seed.html';
  const rootPage = devMode ? '' : '/mux/web/nordnet/seed.html';
  return client.launch_url + rootPage;
}

function loginDevMode(client) {
  return (username = 'stora', password = 'not needed', locale = 'sv-SE') => {
    console.log(`loginDevMode username: ${username} password: ${password}`);
    client.waitForElementVisible('select', 1000);
    client.waitForElementVisible('input', 1000);
    client.expect.element('#login-container').to.be.present;
    client.setValue('input[type=text]', username);
    client.expect.element('button').to.be.present;
    client.click(`select option[value="${locale}"]`);
    client.waitForElementVisible('select', 1000);
    client.click('button');
  };
}

function loginProdMode(client) {
  return (username = 'automat-se-1', password = 'Xd42pafb') => {
    console.log(`loginProdMode username: ${username} password: ${password}`);
    client.expect.element('#supportNavLogin').to.be.present;
    client.click('#supportNavLogin a');
    client.waitForElementVisible('form#loginForm', 5000);
    client.setValue('input#input1', username);
    client.setValue('input#pContent', password);
    client.click('button#login_btn');
  };
}

export default (client) => {
  const url = accountUrl(client);

  return {
    url,
    gotoAccounts() {
      client.url(url);
      client.waitForElementVisible('body', 10000);
    },

    login: (devMode) ? loginDevMode(client) : loginProdMode(client),
  };
}
