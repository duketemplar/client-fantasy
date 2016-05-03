import { expect } from 'chai';
import { initializeLocale, supportedLocales } from '../initialize-intl';

const SUPPORTED_LOCALES = ['sv-SE', 'fi-FI', 'sv-FI', 'nb-NO', 'no-NO', 'nn-NO', 'da-DK', 'en'];

describe('supportedLocales', () => {
  it('returns an array of supported locales', () => {
    expect(supportedLocales()).to.eql(SUPPORTED_LOCALES);
  });
});

describe('initializeLocale', () => {
  // Notice, we can't use promiseHelper since async script occurs at loading

  describe('for unknown locale', () => {
    it('raise an exception', () => {
      const fn = initializeLocale.bind(undefined, 'what');
      expect(fn).to.throw(Error);
    });
  });

  describe('when sv-SE', () => {
    it('formats numbers', (done) => {
      initializeLocale('sv-SE').then(() => {
        const number = 1234.56;
        const formated = new Intl.NumberFormat('se-SE').format(number);
        expect(formated).to.equal('1 234,56');
        done();
      }).catch(done);
    });
  });

  describe('when en', () => {
    it('formats numbers', (done) => {
      initializeLocale('en').then(() => {
        const number = 1234.56;
        const formated = new Intl.NumberFormat('en').format(number);
        expect(formated).to.equal('1,234.56');
        done();
      }, done).catch(done);
    });
  });

  SUPPORTED_LOCALES.forEach((locale) => {
    describe('locale ' + locale, () => {
      it('is supported and returns the locale so we can chain the promise', (done) => {
        initializeLocale(locale).then((res) => {
          expect(res).to.equal(locale);
          done();
        }, done).catch(done);
      });
    });
  });
});
