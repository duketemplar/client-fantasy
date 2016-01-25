function useMockLogin(client) {
  return client.launch_url.includes('localhost');
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
    client.expect.element('.supportNav').to.be.present;
    client.click('.supportNav a.login-btn');
    client.waitForElementVisible('form#loginForm', 5000);
    client.setValue('input#input1', username);
    client.setValue('input#pContent', password);
    client.click('button#login_btn');
    client.waitForElementPresent('#container', 10000);
  };
}

function goTo(client) {
  return () => {
    client.url(client.launch_url);
    if (!useMockLogin(client)) {
      client.waitForElementPresent('#container', 10000);
    }
  };
}

export default (client) => {
  return {
    goTo: goTo(client),
    login: login(client),
  };
}
