import emailValidator from '../email-validator';
import { expect } from 'chai';

describe('Validate email', () => {
  const ErrorMessage = 'some error message';
  const validEmail = 'valid@email.se';
  const inValidEmail = 'in@Valid';
  it('Should not be empty', () => {
    expect(emailValidator(ErrorMessage, '')).to.equal(ErrorMessage);
  });
  it('Should not be undefined', () => {
    expect(emailValidator(ErrorMessage, undefined)).to.equal(ErrorMessage);
  });
  it('Is NOT a valid email', () => {
    expect(emailValidator(ErrorMessage, inValidEmail)).to.equal(ErrorMessage);
  });
  it('Is a valid email', () => {
    expect(emailValidator(ErrorMessage, validEmail)).to.equal(null);
  });
});
