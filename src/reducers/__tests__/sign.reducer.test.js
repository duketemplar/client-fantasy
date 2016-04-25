// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import reducer from '../sign.reducer';
import { expect } from 'chai';
import { UPDATE_SIGN } from '../../actions';

describe('sign.reducer', () => {
  it('updates the state', () => {
    const action = {
      type: UPDATE_SIGN,
      data: {
        signId: 123,
      },
    };

    const expected = {
      signId: 123,
    };

    expect(reducer.sign(undefined, action)).to.eql(expected);
  });

  it('does partial state updates', () => {
    const actionSign = {
      type: UPDATE_SIGN,
      data: {
        signId: 123,
      },
    };

    const actionAcceptAgreements = {
      type: UPDATE_SIGN,
      data: {
        acceptedAgreements: true,
      },
    };

    expect(reducer.sign(undefined, actionSign)).to.eql({
      signId: 123,
    });
    expect(reducer.sign({ signId: 123 }, actionAcceptAgreements)).to.eql({
      signId: 123,
      acceptedAgreements: true,
    });
  });
});
