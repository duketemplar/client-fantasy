// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
import reducer from '../prospect.reducer';
import { expect } from 'chai';

describe.only('prospect.reducer', () => {
  it('updates the store for action: PROSPECT_CREATED', () => {
    const initialState = undefined;
    const action = {
      type: 'PROSPECT_CREATED',
      value: 123,
    };

    const expectedState = {
      prospectId: 123,
    };

    expect(reducer(initialState, action)).to.eql(expectedState);
  });
});
