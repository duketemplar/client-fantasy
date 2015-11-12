const url = '/mux/web/nordnet/seed.html';

function useMockLogin(client) {
  return client.launch_url.includes('localhost');
}

function launchUrl(client) {
  return client.launch_url + url;
}

function login(client) {
  if (useMockLogin(client)) {
    return loginMockMode(client);
  }

  return loginProdMode(client);
}

function getDefaultUserData(client) {
  return {
    username: client.globals.username || '',
    password: client.globals.password || '',
    locale: client.globals.locale || '',
  };
}

function loginMockMode(client) {
  const defaultUser = getDefaultUserData(client);

  return (username = defaultUser.username, password = defaultUser.password, locale = defaultUser.locale) => {
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
  const defaultUser = getDefaultUserData(client);

  return (username = defaultUser.username, password = defaultUser.password) => {
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
