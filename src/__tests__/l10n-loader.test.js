import _ from 'lodash';
import { expect } from 'chai';
import l10nLoader from '../l10n-loader';

const SUPPORTED_LOCALES = ['sv-SE', 'fi-FI', 'sv-FI', 'nb-NO', 'no-NO', 'nn-NO', 'da-DK', 'en'];

describe('l10n-loader', () => {
  it('maps no-NO to nb-NO locale', () => {
    const intlData = l10nLoader('no-NO');
    expect(intlData.locales[0]).to.equal('nb-NO');
  });

  const OTHER_LOCALES = _.without(SUPPORTED_LOCALES, 'no-NO');

  OTHER_LOCALES.forEach((locale) => {
    it(`does not map the locale ${locale}`, () => expect(l10nLoader(locale).locales[0]).to.equal(locale));
  });

  SUPPORTED_LOCALES.forEach((locale) => {
    it('can load ' + locale, () => {
      const intlData = l10nLoader(locale);
      expect(intlData.messages.LOADING).to.be.a('string');
    });
  });
});
