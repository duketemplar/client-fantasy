/* eslint-disable no-console */
import React from 'react';
import { ProspectInfoPage } from '../prospect-info-page';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

describe('in prospect-info component', () => {
  let sandbox;
  let wrapper;
  let handleChangeStub;
  let handlePhoneNumberChange;

  beforeEach(() => {
    const props = {
      prospect: {},
      prospectValidations: {},
      getIntlMessage: message => message,
    };

    sandbox = sinon.sandbox.create();

    handleChangeStub = sandbox.stub(ProspectInfoPage.prototype, 'handleChange');
    handlePhoneNumberChange = sandbox.stub(ProspectInfoPage.prototype, 'handlePhoneNumberChange');

    wrapper = shallow(React.createElement(ProspectInfoPage, props));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('entering a phone number updates the state', () => {
    const input = wrapper.find('#prospect-phone-number');
    input.simulate('change');

    expect(handlePhoneNumberChange).to.have.been.calledOnce();
  });

  it('entering an e-mail updates the state', () => {
    const input = wrapper.find('.prospect__input_email');
    input.simulate('change');

    expect(handleChangeStub).to.have.been.calledOnce();
  });
});
