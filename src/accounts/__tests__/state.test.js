import sinon from 'sinon';
import { expect } from 'chai';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import fetchAccounts from '../actions/fetch-accounts';
import accountsReducer from '../reducers/accounts';
import { createSuccessPromise, createFailPromise } from 'test-helper';

import api from 'nordnet-next-api';

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware // lets us dispatch() functions
//  loggerMiddleware // neat middleware that logs actions
)(createStore);

describe('accounts.states', () => {
  let sandbox;
  let store;
  let stateChanges;
  let unsubscribe;

  function createAccountStore() {
    store = createStoreWithMiddleware(accountsReducer);
  }

  function subscribeToStoreChanges() {
    stateChanges = [];
    unsubscribe = store.subscribe(() => stateChanges.push(store.getState()));
  }

  function stubNextApi(value) {
    sandbox = sinon.sandbox.create();
    sandbox.stub(api, 'get', () => value);
  }

  function unsubsribeAndRestore() {
    stateChanges = [];
    sandbox.restore();
    unsubscribe();
  }

  describe('when successful fetch', () => {
    afterEach(unsubsribeAndRestore);

    beforeEach(() => {
      // given
      createAccountStore();
      stubNextApi(createSuccessPromise({ data: 'some accounts' }));
      subscribeToStoreChanges();

      // when
      store.dispatch(fetchAccounts());
    });

    const EXPECTED_STATE_CHANGES_WHEN_SUCCESS = [
      { isFetching: true, accounts: [] },
      { isFetching: false, accounts: 'some accounts' },
    ];

    it('does two state changes', () => expect(stateChanges.length).to.equal(2));

    EXPECTED_STATE_CHANGES_WHEN_SUCCESS.forEach((expectedState, index) => {
      it('has correct state change number: ' + (index + 1), () => {
        expect(stateChanges[index]).to.eql(expectedState);
      });
    });
  });

  describe('when failed fetch', () => {
    afterEach(unsubsribeAndRestore);

    beforeEach(() => {
      // given
      createAccountStore();
      stubNextApi(createFailPromise({ data: 'ojojoj' }));
      subscribeToStoreChanges();

      // when
      store.dispatch(fetchAccounts());
    });

    const EXPECTED_STATE_CHANGES_WHEN_FAILED = [
      { isFetching: true, accounts: [] },
      { isFetching: false, accounts: [] },
    ];

    it('does two state changes', () => expect(stateChanges.length).to.equal(2));

    EXPECTED_STATE_CHANGES_WHEN_FAILED.forEach((expectedState, index) => {
      it('has correct state change number: ' + (index + 1), () => {
        expect(stateChanges[index]).to.eql(expectedState);
      });
    });
  });
});
