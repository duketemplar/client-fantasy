import Base from '../base';
import { expect } from 'chai';

describe('base model', () => {
  it('should translate keys according to translation dictonary', () => {
    const base = new Base({ notkey: 'value' }, { notkey: 'key' });

    expect(base.key).to.eql('value');
    expect(base.notkey).to.eql(undefined);
  });

  it('should not crash if no translations given', () => {
    const base = new Base({ notkey: 'value' });

    expect(base.notkey).to.eql('value');
  });

  it('should translate to camel case automatically', () => {
    const base = new Base({ not_key: 'value' });

    expect(base.notKey).to.eql('value');
  });

  it('should not translate keys that where transformed using dictionary', () => {
    const base = new Base({ notkey: 'value' }, { notkey: 'a_key' });

    expect(base.a_key).to.eql('value');
    expect(base.notkey).to.eql(undefined);
  });

  it('should be able to translate snake to camel', () => {
    const base = new Base();

    expect(base.translateToCamelCase('a_case')).to.eql('aCase');
    expect(base.translateToCamelCase('a_case_studdy')).to.eql('aCaseStuddy');
    expect(base.translateToCamelCase('a_case_studdyBegins')).to.eql('aCaseStuddyBegins');
    expect(base.translateToCamelCase('aTotalyFineString')).to.eql('aTotalyFineString');
  });
});
