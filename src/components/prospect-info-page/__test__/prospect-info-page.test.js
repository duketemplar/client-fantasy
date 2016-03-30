/* eslint-disable no-console */
import React from 'react';
import { ProspectInfoPage } from '../prospect-info-page';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

describe.only('in prospect-info component', () => {
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
});
