import reducers from '../kyc.reducer';
import { expect } from 'chai';
import { Kyc } from '../../models';
import { changeKyc } from '../../actions';

describe('kyc.reducer', () => {
  it('should initialize kyc', () => {
    expect(reducers.kyc(undefined, { type: '@@init' })).to.eql(new Kyc());
  });

  it('should update only changed kyc fields', () => {
    const initialState = new Kyc({
      employment: false,
      income: 'cash money',
    });
    const action = changeKyc({
      employment: true,
    });

    expect(reducers.kyc(initialState, action)).to.eql(new Kyc({
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
    expect(reducers.kycValidations(initialState, action)).to.eql({
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
