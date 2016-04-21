import { toggleAcceptedAggreements } from '../';
import sinon from 'sinon';
import { expect } from 'chai'; // ??

describe('sign action', () => {
  let sandbox;
  let dispatchStub;
  let getStateStub;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    dispatchStub = sandbox.spy();
    getStateStub = sandbox.spy();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('can set the accepted aggreement state', () => {
    const actionCreator = toggleAcceptedAggreements(false);
    const expected = {
      type: 'UPDATE_SIGN',
      data: { acceptedAgreements: false },
    };

    actionCreator(dispatchStub, getStateStub);

    expect(dispatchStub.calledWith(expected)).to.be.equal(true);
  });
});
