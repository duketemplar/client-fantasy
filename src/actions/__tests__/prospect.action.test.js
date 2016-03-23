import {
  changeProspect,
  createOrUpdateProspect,
  createProspect,
  updateProspect,
  receivedProspect,
  RECEIVED_PROSPECT,
  CHANGE_PROSPECT,
} from '../';
import sinon from 'sinon';
import nnAPI from 'nordnet-next-api';
import { expect, assert } from 'chai'; // ??
import { CUSTOMERS_PROSPECTS_PATH } from '../../utils/endpoints';
import { mockNNAPI, getDispatch } from './mocking';

describe('prospect actions', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should change state', () => {
    const action = changeProspect({ id: 'a-id', phoneNumber: 'number' });
    expect(action).to.be.eql({
      type: CHANGE_PROSPECT,
      fieldsToChange: { id: 'a-id', phoneNumber: 'number' },
    });
  });

  it('should be able to trigger receivedProspect', () => {
    const action = receivedProspect({ id: 'this-is-id', automatic: true });

    expect(action).to.be.eql({
      type: RECEIVED_PROSPECT,
      prospect: { id: 'this-is-id', automatic: true },
    });
  });

  it('should call create if no id present', () => {
    const nnAPIPostStub = mockNNAPI({ id: 'is-an-id' }, 'post', sandbox, nnAPI);
    const nnAPIPutStub = mockNNAPI({ id: 'is-an-id' }, 'put', sandbox, nnAPI);
    const getStateStub = sandbox.stub().returns({ prospect: { id: null } });

    const action = createOrUpdateProspect();
    action(getDispatch(getStateStub), getStateStub);

    assert(nnAPIPostStub.called, 'nn api did not call post');
    assert(!nnAPIPutStub.called, 'nn api did call put');
    expect(nnAPIPostStub.calledWith(CUSTOMERS_PROSPECTS_PATH, sinon.match.any, sinon.match.any));
  });

  it('should call update if id present', () => {
    const nnAPIPutStub = mockNNAPI({ id: 'is-an-id' }, 'put', sandbox, nnAPI);
    const nnAPIPostStub = mockNNAPI({ id: 'is-an-id' }, 'post', sandbox, nnAPI);
    const getStateStub = sandbox.stub().returns({ prospect: { id: 'id' } });

    const action = createOrUpdateProspect();
    action(getDispatch(getStateStub), getStateStub);

    assert(nnAPIPutStub.called, 'nn api did not call put');
    assert(!nnAPIPostStub.called, 'nn api did call post');
    expect(nnAPIPutStub.calledWith(`${CUSTOMERS_PROSPECTS_PATH}/id`, sinon.match.any, sinon.match.any));
  });

  it('should be able to create prospect', () => {
    const nnAPIPostStub = mockNNAPI({ prospect_id: 'an-id' }, 'post', sandbox, nnAPI);
    const getStateStub = sandbox.stub().returns({ prospect: {
      nationalIdNumber: '199008121234',
      nationalIdNumberCountryCode: 'SE',
    } });

    const action = createProspect();
    const dispatch = sinon.spy(getDispatch(getStateStub));

    action(dispatch, getStateStub);

    assert(nnAPIPostStub.called, 'did not call POST on nn api');
    sinon.assert.calledWith(nnAPIPostStub, CUSTOMERS_PROSPECTS_PATH, {
      national_id_number: '199008121234',
      national_id_number_country_code: 'SE',
      citizen: undefined,
      email: undefined,
      phone_number: undefined,
    },
      sinon.match.any
    );
  });

  it('should be able to update prospect', () => {
    const nnAPIPutStub = mockNNAPI({ id: 'an-id' }, 'put', sandbox, nnAPI);
    const getStateStub = sandbox.stub().returns({ prospect: {
      id: 'a-id',
      phoneNumber: '+467012345678',
      email: 'test@test.test',
      citizen: 'SE',
    } });

    const action = updateProspect();

    action(getDispatch(getStateStub), getStateStub);

    assert(nnAPIPutStub.called, 'did not call PUT on nn api');
    sinon.assert.calledWith(nnAPIPutStub, CUSTOMERS_PROSPECTS_PATH + '/a-id', {
      phone_number: '+467012345678',
      email: 'test@test.test',
      citizen: 'SE',
    },
      sinon.match.any
    );
  });
});
