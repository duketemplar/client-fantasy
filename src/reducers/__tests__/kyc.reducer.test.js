import reducers from '../regulation.reducer';
import { expect } from 'chai';
import { Kyc } from '../../models';
import { changeKyc } from '../../actions';

describe('kyc.reducer', () => {
  it('should initialize kyc', () => {
    expect(reducers.kyc(undefined, { type: '@@init' })).to.eql(new Kyc());
  });

  it('should update only changed fields', () => {
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

  it('should validate changed fields', () => {
    const initialState = {};
    const action = changeKyc({
      employment: null,
    });
    expect(reducers.kycValidations(initialState, action)).to.eql({
      employment: 'This question needs to be answered.',
    });
  });
});
