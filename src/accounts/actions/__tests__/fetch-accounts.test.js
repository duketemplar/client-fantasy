import { expect } from 'chai';
import api from 'nordnet-next-api';
import { createSuccessPromise, createFailPromise } from 'test-helper';
import { ACCOUNTS_REQUEST } from '../action-types';
import fetchAccounts from '../fetch-accounts';

describe('accounts.actions.fetchAccounts', () => {
  let sandbox;

  beforeEach(() => sandbox = sinon.sandbox.create());
  afterEach(() => sandbox.restore());

  function stubNextApi(value) {
    sandbox.stub(api, 'get', () => value);
  }

  it('dispatch an ACCOUNTS_REQUEST first', () => {
    const dispatch = sandbox.spy();
    fetchAccounts()(dispatch);
    const expected = { type: ACCOUNTS_REQUEST };
    expect(dispatch).to.have.been.calledWith(expected);
  });

  describe('when success', () => {
    let dispatch;

    beforeEach(() => {
      // given
      stubNextApi(createSuccessPromise({ data: 'some accounts' }));

      // when
      dispatch = sandbox.spy();
      fetchAccounts()(dispatch);
    });

    const expectedAction = { type: 'ACCOUNTS_REQUEST_SUCCESS', data: 'some accounts' };

    it('dispatch two actions', () => expect(dispatch.callCount).to.equal(2));
    it('dispatch ACCOUNTS_REQUEST_SUCCESS', () => expect(dispatch.secondCall.args[0]).to.deep.equal(expectedAction));
  });

  describe('when fail', () => {
    let dispatch;

    beforeEach(() => {
      // given
      stubNextApi(createFailPromise({ data: 'Ohh no #!@' }));

      // when
      dispatch = sandbox.spy();
      fetchAccounts()(dispatch);
    });

    const expectedAction = { type: 'ACCOUNTS_REQUEST_FAILURE', data: 'Ohh no #!@' };

    it('dispatch two actions', () => expect(dispatch.callCount).to.equal(2));
    it('dispatch ACCOUNTS_REQUEST_SUCCESS', () => expect(dispatch.secondCall.args[0]).to.deep.equal(expectedAction));
  });
});
