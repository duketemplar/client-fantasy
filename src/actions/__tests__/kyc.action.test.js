import {
  changeKyc,
  CHANGE_KYC,
} from '../';
import { expect } from 'chai';

describe('kyc.action', () => {
  it('should be able to change kyc', () => {
    const action = changeKyc({ savings_purpose: 'exterminate' });
    expect(action).to.be.eql({
      type: CHANGE_KYC,
      fieldsToChange: { savings_purpose: 'exterminate' },
    });
  });
});
