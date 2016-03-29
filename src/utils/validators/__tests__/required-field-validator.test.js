import requiredFieldValidator from '../required-field-validator';
import { expect } from 'chai';

describe('Required field validator', () => {
  const errorMessage = 'some error message';
  const nullValue = null;
  const isZero = 0;
  const errorBlank = '';
  const errorUndef = undefined;
  const errorFalse = false;
  const someString = 'some values';
  const shortString = '1';
  const emptyString = '';

  it('Not a required field: null', () => {
    expect(requiredFieldValidator(errorMessage, nullValue)).to.equal(errorMessage);
  });
  it('Not a required field: blank', () => {
    expect(requiredFieldValidator(errorMessage, errorBlank)).to.equal(errorMessage);
  });
  it('Not a required field: undefied', () => {
    expect(requiredFieldValidator(errorMessage, emptyString)).to.equal(errorMessage);
  });
  it('Not a required field: empty string', () => {
    expect(requiredFieldValidator(errorMessage, errorUndef)).to.equal(errorMessage);
  });
  it('Is required false', () => {
    expect(requiredFieldValidator(errorMessage, errorFalse)).to.equal(null);
  });
  it('Is required zero(0)', () => {
    expect(requiredFieldValidator(errorMessage, isZero)).to.equal(null);
  });
  it('Is required short string', () => {
    expect(requiredFieldValidator(errorMessage, shortString)).to.equal(null);
  });
  it('Is a valid string', () => {
    expect(requiredFieldValidator(errorMessage, someString)).to.equal(null);
  });
});
