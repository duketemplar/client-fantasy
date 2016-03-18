/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers, maximumLineLength */
import { CompliancePage } from '../compliance-page';
import nnAPI from 'nordnet-next-api';
import sinon from 'sinon';
import store from '../../../store';

describe('Compliance Page rest calls', () => {
  let sandbox;
  let compliancePage;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    compliancePage = new CompliancePage();
  });

  afterEach(() => {
    sandbox.restore();
    compliancePage = null;
  });

  function stubNnAPIresolve(method, data) {
    sandbox.stub(nnAPI, method, () => new Promise(resolve => resolve(data)));
  }

  function stubNnAPIreject(method, data) {
    sandbox.stub(nnAPI, method, () => new Promise((resolve, reject) => reject(data)));
  }

  describe('doing a validate regulation', () => {
    it('should get the regulation id when service reply with status 200', () => {
      const response = {
        status: 200,
        data: {
          regulation_id: 123,
        },
      };
      stubNnAPIresolve('post', response);
      const storeDispatchSpy = sandbox.spy(store, 'dispatch');

      return compliancePage
      .validateRegulation()
      .then(null, null, storeDispatchSpy)
      .then(() => {
        storeDispatchSpy.should.have.been.calledWith({ type: 'REGULATION_VALIDATED', value: response.data.regulation_id });
      });
    });

    it('should reject when service answer 400', () => {
      const response = {
        status: 400,
        data: {},
      };
      stubNnAPIreject('post', response);

      return compliancePage
      .validateRegulation().should.be.rejected;
    });
  });
});
