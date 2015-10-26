const url = '/mux/web/nordnet/seed.html';

const beforeEach = client => {
  client
    .url(client.launch_url + url)
    .waitForElementVisible('body', 1000);
};

const displaysPage = client => {
  client.waitForElementVisible('body', 1000);
  client.expect.element('#nordnet-react-app-light').to.be.present;
  client.end();
};

export default {
  beforeEach,
  'Page loads': displaysPage,
};
