// jscs:disable maximumLineLength
import endpoints from '../endpoints';
import { assert } from 'chai';

describe('Prospect info page', () => {
  it('gets different urls to nordnet API depending on environment', () => {
    const testValues = [
      {
        host: 'http://localhost',
        expected: '/api/2',
      },
      {
        host: 'https://nordnet.webfront1.ci.nordnet.se',
        expected: 'https://eservice-nnapi.ci.nordnet.se:80/api/2',
      },
      {
        host: 'https://nordnet.web-konkar.test.nordnet.se',
        expected: 'https://eservice-nnapi.test.nordnet.se:80/api/2',
      },
    ];

    testValues.forEach(value => {
      assert.equal(endpoints.getNordnetAPIURI(value.host), value.expected);
    });
  });
});
