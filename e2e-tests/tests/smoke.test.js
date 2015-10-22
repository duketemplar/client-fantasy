const url = '/mux/web/nordnet/seed.html';

const beforeEach = client => {
  client
    .url(client.launch_url + url)
    .waitForElementVisible('body', 1000);
};

const displaysPage = client => {
  client.expect.element('#nordnet-react-app-light').to.be.present;
  client.end();
};

export default {
  beforeEach,
  'Page loads': displaysPage,
};
