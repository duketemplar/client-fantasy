const beforeEach = client => {
  client
    .url(client.launch_url)
    .waitForElementVisible('body', 1000);
};

const displaysPage = client => {
  client.expect.element('body').to.be.present;
  client.end();
};

export default {
  beforeEach,
  'Page loads': displaysPage,
};
