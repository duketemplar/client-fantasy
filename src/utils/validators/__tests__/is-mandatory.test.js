import isMandatory from '../is-mandatory';
import { expect } from 'chai';

describe('Not blank validator', () => {
  const errorMessage = 'some error message';
  const errorNull = null;
  // const isZero = 0;
  const errorBlank = '';
  const errorUndef = undefined;
  const errorFalse = false;
  const errorNaN = NaN;
  const notBlank = 'some values';
  // it('Is zero', () => {
  //   expect(isMandatory(errorMessage, isZero)).to.equal(null);
  // });
  it('Is not null', () => {
    expect(isMandatory(errorMessage, errorNull)).to.equal(errorMessage);
  });
  it('Is not blank', () => {
    expect(isMandatory(errorMessage, errorBlank)).to.equal(errorMessage);
  });
  it('Is not undefied', () => {
    expect(isMandatory(errorMessage, errorUndef)).to.equal(errorMessage);
  });
  it('Is not falsy', () => {
    expect(isMandatory(errorMessage, errorFalse)).to.equal(errorMessage);
  });
  it('Is not NaN', () => {
    expect(isMandatory(errorMessage, errorNaN)).to.equal(errorMessage);
  });
  it('Is a valid value', () => {
    expect(isMandatory(errorMessage, notBlank)).to.equal(null);
  });
});
