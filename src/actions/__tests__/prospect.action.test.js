import { changeProspect, createOrUpdateProspect } from '../';
import sinon from 'sinon';
import nnAPI from 'nordnet-next-api';
import { expect, assert } from 'chai'; // ??
import { CUSTOMERS_PROSPECTS_PATH } from '../../utils/endpoints';

describe('prospect actions', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  function mockNNAPI(ret, method) {
    return sandbox.stub(nnAPI, method, () => {
      return new Promise((resolve) => {
        resolve({ status: 200, data: ret });
      });
    });
  }

  function getDispatch(getState) {
    const dispatch = (action) => {
      if (typeof(action) === 'function') {
        action(dispatch, getState);
      }
    };

    return dispatch;
  }

  afterEach(() => {
    sandbox.restore();
  });

  it('should change state', () => {
    const action = changeProspect({ id: 'a-id', phoneNumber: 'number' });
    expect(action).to.be.eql({
      type: 'CHANGE_PROSPECT',
      fieldsToChange: { id: 'a-id', phoneNumber: 'number' },
    });
  });

  it('should call create if no id present', () => {
    const nnAPIPostStub = mockNNAPI({ id: 'is-an-id' }, 'post');
    const nnAPIPutStub = mockNNAPI({ id: 'is-an-id' }, 'put');
    const getStateStub = sandbox.stub().returns({ prospect: { id: null } });

    const action = createOrUpdateProspect();
    action(getDispatch(getStateStub), getStateStub);

    assert(nnAPIPostStub.called, 'nn api did not call post');
    assert(!nnAPIPutStub.called, 'nn api did call put');
    expect(nnAPIPostStub.calledWith(CUSTOMERS_PROSPECTS_PATH, sinon.match.any, sinon.match.any));
  });

  it('should call update if id present', () => {
    const nnAPIPutStub = mockNNAPI({ id: 'is-an-id' }, 'put');
    const nnAPIPostStub = mockNNAPI({ id: 'is-an-id' }, 'post');
    const getStateStub = sandbox.stub().returns({ prospect: { id: 'id' } });

    const action = createOrUpdateProspect();
    action(getDispatch(getStateStub), getStateStub);

    assert(nnAPIPutStub.called, 'nn api did not call put');
    assert(!nnAPIPostStub.called, 'nn api did call post');
  });

  it('should be able to create prospect', () => {
    sandbox.stub(nnAPI, 'post', () => {
      return new Promise((resolve) => {
        resolve({ status: 200, data: { id: 'this-id-an-id' } });
      });
    });
  });
});
