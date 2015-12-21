const url = '/mux/web/nordnet/seed.html';

function launchUrl(client) {
  return client.launch_url + url;
}

function gotoAccounts(client) {
  const url = launchUrl(client);

  return () => {
    client.url(url);
    client.waitForElementPresent('#crs-pop-up-app', 10000);
  };
}

export default (client) => {
  return {
    gotoAccounts: gotoAccounts(client),
  };
}
