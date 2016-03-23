import isMandatory from '../is-mandatory';
import { expect } from 'chai';

describe('Not blank validator', () => {
  const errorMessage = 'some error message';
  const nullValue = null;
  const isZero = 0;
  const errorBlank = '';
  const errorUndef = undefined;
  const errorFalse = false;
  const someString = 'some values';
  const shortString = '1';
  const emptyString = '';

  it('Not mandatory null', () => {
    expect(isMandatory(errorMessage, nullValue)).to.equal(errorMessage);
  });
  it('Not mandatory blank', () => {
    expect(isMandatory(errorMessage, errorBlank)).to.equal(errorMessage);
  });
  it('Not mandatory undefied', () => {
    expect(isMandatory(errorMessage, emptyString)).to.equal(errorMessage);
  });
  it('Not mandatory empty string', () => {
    expect(isMandatory(errorMessage, errorUndef)).to.equal(errorMessage);
  });
  it('Is mandatory false', () => {
    expect(isMandatory(errorMessage, errorFalse)).to.equal(null);
  });
  it('Is mandatory zero(0)', () => {
    expect(isMandatory(errorMessage, isZero)).to.equal(null);
  });
  it('Is mandatory short string', () => {
    expect(isMandatory(errorMessage, shortString)).to.equal(null);
  });
  it('Is a valid string', () => {
    expect(isMandatory(errorMessage, someString)).to.equal(null);
  });
});
