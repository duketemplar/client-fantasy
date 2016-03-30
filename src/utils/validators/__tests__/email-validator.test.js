import emailValidator from '../email-validator';
import { expect } from 'chai';

describe('Validate email', () => {
  const ErrorMessage = 'some error message';
  const validEmail = 'valid@email.se';
  const inValidEmail = 'in@Valid';

  it('It is ok to be empty string', () => {
    expect(emailValidator(ErrorMessage, '')).to.equal(null);
  });
  it('It is ok to have value undefined', () => {
    expect(emailValidator(ErrorMessage, undefined)).to.equal(null);
  });
  it('Is NOT a valid email', () => {
    expect(emailValidator(ErrorMessage, inValidEmail)).to.equal(ErrorMessage);
  });
  it('Is a valid email', () => {
    expect(emailValidator(ErrorMessage, validEmail)).to.equal(null);
  });
});
