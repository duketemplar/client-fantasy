/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers, maximumLineLength */
import { CompliancePage } from '../compliance-page.jsx';
import nnAPI from 'nordnet-next-api';
import sinon from 'sinon';
import store from '../../../store';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

describe('Compliance', () => {
  let wrapper;
  let sandbox;

  beforeEach(() => {
    const props = {
      kyc: {},
      regulation: {},
      pep: {},
    };

    sandbox = sinon.sandbox.create();
    sandbox.stub(CompliancePage.prototype, 'handleChange', () => {});

    wrapper = shallow(<CompliancePage { ...props } />);
  });

  afterEach(() => {
    sandbox.restore();
    wrapper = null;
  });

  describe('section has valid quesion answers', () => {
    it('gives you two opions for taxable outside jurisdicion question.', () => {
      const component = wrapper.find('.compliance__taxable-outside-jursdiction');

      expect(component.prop('options')).to.have.length(2);
    });

    it('gives you two opions for the fatca question.', () => {
      const component = wrapper.find('.compliance__question_taxable-in-usa');

      expect(component.prop('options')).to.have.length(2);
    });

    it('gives you three opions for emplyment status.', () => {
      const component = wrapper.find('.compliance__employment-status');

      expect(component.prop('options')).to.have.length(3);
    });

    it('gives you three opions for yearly income.', () => {
      const component = wrapper.find('.compliance__yearly-income');

      expect(component.prop('options')).to.have.length(3);
    });

    it('gives you five opions for the purpose of the savings.', () => {
      const component = wrapper.find('.checkbox__row').get(0);

      expect(component.props.children).to.have.length(5);
    });

    it('gives you two opions for the origin of the finances.', () => {
      const component = wrapper.find('.compliance__funds-and-securities-originate');

      expect(component.prop('options')).to.have.length(2);
    });

    it('gives you three opions for the yearly deposit into the account.', () => {
      const component = wrapper.find('.compliance__yearly-value-of-deposits');

      expect(component.prop('options')).to.have.length(3);
    });

    it('gives you two opions if you are an exposed political person.', () => {
      const component = wrapper.find('.compliance__politically-exposed-in-other-nation');

      expect(component.prop('options')).to.have.length(2);
    });
  });
});


describe.skip('Compliance Page rest calls', () => {
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
