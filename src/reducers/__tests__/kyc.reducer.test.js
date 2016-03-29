import kycReducers from '../kyc.reducer.js';
import { expect } from 'chai';
import { Kyc } from '../../models';
import { changeKyc } from '../../actions';

describe('kyc.reducer', () => {
  it('should initialize kyc', () => {
    expect(kycReducers.kyc(undefined, { type: '@@init' })).to.eql(new Kyc());
  });

  it('should update only changed kyc fields', () => {
    const initialState = new Kyc({
      employment: false,
      income: 'cash money',
    });
    const action = changeKyc({
      employment: true,
    });

    expect(kycReducers.kyc(initialState, action)).to.eql(new Kyc({
      employment: true,
      income: 'cash money',
    }));
  });

  it('should validate changed kyc fields', () => {
    const initialState = {};
    const action = changeKyc({
      taxableOutsideJurisdiction: null,
      USCitizen: null,
      employment: null,
      income: null,
      sourceOfFunds: null,
      yearlyDeposits: null,
      politicallyExposedPerson: null,
    });
    expect(kycReducers.kycValidations(initialState, action)).to.eql({
      taxableOutsideJurisdiction: 'This question needs to be answered.',
      USCitizen: 'This question needs to be answered.',
      employment: 'This question needs to be answered.',
      income: 'This question needs to be answered.',
      sourceOfFunds: 'This question needs to be answered.',
      yearlyDeposits: 'This question needs to be answered.',
      politicallyExposedPerson: 'This question needs to be answered.',
    });
  });
});
