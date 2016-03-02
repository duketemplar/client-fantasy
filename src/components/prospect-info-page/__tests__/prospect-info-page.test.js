import { ProspectInfoPage } from '../prospect-info-page';
import { assert } from 'chai';

describe('Prospect info page', () => {
  it('gets different urls to customer creation depending on environment', () => {
    const page = new ProspectInfoPage();

    const testValues = [
      {
        hostname: 'http://localhost',
        expected: '/api/2/customer-creation',
      },
      {
        hostname: 'https://nordnet.webfront1.ci.nordnet.se',
        expected: 'http://service-customer-creation.ci.nordnet.se/v1',
      },
      {
        hostname: 'https://nordnet.web-konkar.test.nordnet.se',
        expected: 'http://service-customer-creation.test.nordnet.se/v1',
      },
    ];

    testValues.forEach(value => {
      assert.equal(page.getCustomerCreationUri(value.hostname), value.expected);
    });
  });
});
