import {
  changeKyc,
  changePep,
  changeRegulation,
  createRegulation,
  updateRegulation,
  createOrUpdateRegulation,
  CHANGE_KYC,
  CHANGE_PEP,
  CHANGE_REGULATION,
} from '../';
import sinon from 'sinon';
import nnAPI from 'nordnet-next-api';
import { expect, assert } from 'chai'; // ??
import { CUSTOMERS_REGULATIONS_PATH } from '../../utils/endpoints';
import { mockNNAPI, getDispatch } from './mocking';

describe('regulation.action', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be able to change kyc', () => {
    const action = changeKyc({ savings_purpose: 'exterminate' });
    expect(action).to.be.eql({
      type: CHANGE_KYC,
      fieldsToChange: { savings_purpose: 'exterminate' },
    });
  });

  it('should be able to change pep', () => {
    const action = changePep({ isPep: true });
    expect(action).to.be.eql({
      type: CHANGE_PEP,
      fieldsToChange: { isPep: true },
    });
  });

  it('should be able to change regulation', () => {
    const action = changeRegulation({ taxableInJurisdiction: false });
    expect(action).to.be.eql({
      type: CHANGE_REGULATION,
      fieldsToChange: { taxableInJurisdiction: false },
    });
  });

  it('should be able to create regulation', () => {
    const nnAPIPostStub = mockNNAPI({ id: 'new-id' }, 'post', sandbox, nnAPI);
    const getStateStub = sandbox.stub().returns({ regulation: { id: null }, kyc: {}, pep: {}, taxInfo: {} });
    const action = createRegulation();

    action(getDispatch(getStateStub), getStateStub);

    assert(nnAPIPostStub.called, 'did not call post on NN api');
    expect(nnAPIPostStub).calledWith(CUSTOMERS_REGULATIONS_PATH, sinon.match.any, sinon.match.any);
  });

  it('should be able to update regulation', () => {
    const nnAPIPutStub = mockNNAPI({ id: 'new-id' }, 'put', sandbox, nnAPI);
    const getStateStub = sandbox.stub().returns({ regulation: { id: 'id-yo' }, kyc: {}, pep: {}, taxInfo: {} });
    const action = updateRegulation();

    action(getDispatch(getStateStub), getStateStub);

    assert(nnAPIPutStub.called, 'did not call put on NN api');
    expect(nnAPIPutStub).calledWith(CUSTOMERS_REGULATIONS_PATH + '/id-yo', sinon.match.any, sinon.match.any);
  });

  it('should call update if id is present', () => {
    const nnAPIPutStub = mockNNAPI({ id: 'new-id' }, 'put', sandbox, nnAPI);
    const nnAPIPostStub = mockNNAPI({ id: 'new-id' }, 'post', sandbox, nnAPI);
    const getStateStub = sandbox.stub().returns({ regulation: { id: 'id-yo' }, kyc: {}, pep: {}, taxInfo: {} });
    const action = createOrUpdateRegulation();

    action(getDispatch(getStateStub), getStateStub);

    assert(nnAPIPutStub.called, 'did not call put on NN api');
    assert(!nnAPIPostStub.called, 'did call post when update expected');
    expect(nnAPIPutStub).calledWith(CUSTOMERS_REGULATIONS_PATH + '/id-yo', sinon.match.any, sinon.match.any);
  });


  it('should call create if no id is present', () => {
    const nnAPIPutStub = mockNNAPI({ id: 'new-id' }, 'put', sandbox, nnAPI);
    const nnAPIPostStub = mockNNAPI({ id: 'new-id' }, 'post', sandbox, nnAPI);
    const getStateStub = sandbox.stub().returns({ regulation: { id: null }, kyc: {}, pep: {}, taxInfo: {} });
    const action = createOrUpdateRegulation();

    action(getDispatch(getStateStub), getStateStub);

    assert(nnAPIPostStub.called, 'did not call post on NN api');
    assert(!nnAPIPutStub.called, 'did call put when create expected');
    expect(nnAPIPostStub).calledWith(CUSTOMERS_REGULATIONS_PATH, sinon.match.any, sinon.match.any);
  });
});
