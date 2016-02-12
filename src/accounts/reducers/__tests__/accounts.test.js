import { expect } from 'chai';
import { ACCOUNTS_REQUEST } from '../../actions/action-types';
import accounts from '../accounts';

describe('accounts.reducers.accounts', () => {
  describe('accounts', () => {
    it('sets default state first time', () => {
      const newState = accounts(undefined, { type: 'UNKNOWN_ACTION' });
      expect(newState).to.eql({ isFetching: false, accounts: [] });
    });

    it('handles ACCOUNTS_REQUEST', () => {
      const state = {};
      const newState = accounts(state, { type: ACCOUNTS_REQUEST });
      expect(newState.isFetching).to.equal(true);
    });
  });
});
