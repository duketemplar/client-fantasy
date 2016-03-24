import lengthValidator from '../length-validator';
import { expect } from 'chai';

describe('Validate length', () => {
  const errorMsg = 'some error msg';

  it('It is possible with 0 and len 1', () => {
    expect(lengthValidator(1, errorMsg, 0)).to.equal(null);
  });
  it('It is possible with 3 char and len 3', () => {
    expect(lengthValidator(3, errorMsg, 123)).to.equal(null);
  });
  it('It is NOT possible with 3 char and len 4', () => {
    expect(lengthValidator(4, errorMsg, 123)).to.equal(errorMsg);
  });
  it('It is possible with boolean and whatever length!?', () => {
    expect(lengthValidator(4, errorMsg, false)).to.equal(null);
  });
});
