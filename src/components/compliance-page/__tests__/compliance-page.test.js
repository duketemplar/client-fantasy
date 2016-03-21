/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers, maximumLineLength */
import { CompliancePage } from '../compliance-page';
import nnAPI from 'nordnet-next-api';
import sinon from 'sinon';
import store from '../../../store';
import { expect } from 'chai';

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

  describe('doing an prospect update with regulation id', () => {
    it('should first get the regulation id then do the prospect update', () => {
      sandbox.stub(nnAPI, 'post', () => {
        return new Promise(resolve => {
          setTimeout(
            resolve.bind(null,
              { status: 200,
                data: { regulation_id: 123 },
              }), 500);
        });
      });

      sandbox.stub(nnAPI, 'put', () => {
        return new Promise(resolve => {
          setTimeout(
            resolve.bind(null,
              { status: 200 }),
            100);
        });
      });

      const validateRegulationSpy = sandbox.spy(compliancePage, 'validateRegulation');
      const updateProspectSpy = sandbox.spy(compliancePage, 'updateProspect');

      const complianceInfo = { taxableOutsideJurisdiction: 'no' };

      return compliancePage
      .completeComlianceUpdate(complianceInfo)
      .then(null, null, validateRegulationSpy)
      .then(() => {
        expect(validateRegulationSpy).has.been.calledBefore(updateProspectSpy);
      });
    });
  });
});
