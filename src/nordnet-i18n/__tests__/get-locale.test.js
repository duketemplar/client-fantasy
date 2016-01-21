import sinon from 'sinon';
import { expect } from 'chai';
import '../initialize-intl';
import getLocale from '../get-locale';
import api from 'nordnet-next-api';

describe('getLocale', () => {
  let resolvedValue;

  describe('when data-lang and data-lang is given in element', () => {
    beforeEach((done) => {
      const element = {
        getAttribute: (key) => ({ 'data-lang': 'sv', 'data-country': 'SE' })[key],
      };
      getLocale(element).then((value) => resolvedValue = value).then(() => done(), done);
    });

    it('returns a lang-country string', () => expect(resolvedValue).to.equal('sv-SE'));
  });

  describe('when data-lang is not given', () => {
    let sandbox;

    function mockPromise(resolveValue) {
      return {
        then(cb) { return mockPromise(cb(resolveValue)); },
      };
    }

    beforeEach(() => {
      sandbox = sinon.sandbox.create();
      const response = { data: { lang: 'en', country: 'gb' } };
      sandbox.stub(api, 'get', () => mockPromise(response));
    });

    afterEach(() => sandbox.restore());

    beforeEach((done) => {
      const element = {
        getAttribute: (key) => ({})[key],
      };

      getLocale(element)
        .then((value) => resolvedValue = value)
        .then(() => done(), done);
    });

    it('returns the locale from the next api', () => expect(resolvedValue).to.equal('en-gb'));

    it('uses /api/2/login', () => expect(api.get).to.have.been.calledWith('/api/2/login'));
  });
});
