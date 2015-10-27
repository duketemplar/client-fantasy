function useMockLogin(client) {
  return client.globals.use_mock_login;
}

function launchUrl(client) {
  const relUrl = client.globals.relative_launch_url || '';
  return client.launch_url + relUrl;
}

function login(client) {
  if (useMockLogin(client)) {
    return loginMockMode(client);
  }

  return loginProdMode(client);
}

function loginMockMode(client) {
  // maybe default username/password should be moved to nightwatch.json config ?
  return (username = 'stora', password = 'not needed', locale = 'sv-SE') => {
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
    client.expect.element('#supportNavLogin').to.be.present;
    client.click('#supportNavLogin a');
    client.waitForElementVisible('form#loginForm', 5000);
    client.setValue('input#input1', username);
    client.setValue('input#pContent', password);
    client.click('button#login_btn');
  };
}

function gotoAccounts(client) {
  const url = launchUrl(client);

  return () => {
    client.url(url);
    client.waitForElementVisible('body', 10000);
  };
}

export default (client) => {
  return {
    gotoAccounts: gotoAccounts(client),
    login: login(client),
  };
}
