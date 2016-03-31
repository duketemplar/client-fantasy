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

  beforeEach(() => {
    const props = {
      prospect: {},
      prospectValidations: {},
    };

    sandbox = sinon.sandbox.create();
    wrapper = shallow(React.createElement(ProspectInfoPage, props));
    handleChangeStub = sandbox.stub(ProspectInfoPage.prototype, 'handleChange', () => console.log('handleChange() called!'));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('entering a phone number updates the state', () => {
    const input = wrapper.find('.prospect__input_phone');
    input.simulate('change');

    expect(handleChangeStub).to.have.been.calledOnce();
  });

  it('entering an e-mail updates the state', () => {
    const input = wrapper.find('.prospect__input_email');
    input.simulate('change');

    expect(handleChangeStub).to.have.been.calledOnce();
  });

  it('disables continue button when no input pressent', () => {
    const continueButton = wrapper.find('.compliance__button_continue');
    expect(continueButton.props().disabled).to.equal(true, 'should be disabled initially');
  });

  it('enables continue button when valid input is supplied', () => {
    wrapper.setProps({
      prospect: {
        phoneNumber: '070 - 123 45 67',
        email: 'dummy@nordnet.se',
      },
    });
    const continueButton = wrapper.find('.compliance__button_continue');
    expect(continueButton.props().disabled).to.equal(false, 'should be enabled with valid input');
  });
});
