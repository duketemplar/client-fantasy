import { changePep, CHANGE_PEP } from '../';
import { expect } from 'chai';

describe('pep.action', () => {
  it('should be able to change pep', () => {
    const action = changePep({ isPep: true });
    expect(action).to.be.eql({
      type: CHANGE_PEP,
      fieldsToChange: { isPep: true },
    });
  });
});
