/* eslint-disable no-console */
import React from 'react';
import { IdentifyPage } from '../identify-page';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import { Input, Button } from 'nordnet-ui-kit';

describe('on identify identifyPage', () => {
  let wrapper;
  let sandbox;
  let handleChangeStub;

  beforeEach(() => {
    const props = {
      prospect: {},
      prospectValidations: {},
      getIntlMessage: message => message,
    };

    sandbox = sinon.sandbox.create();
    handleChangeStub = sandbox.stub(IdentifyPage.prototype, 'handleChange', () => console.log('handleChange() called!'));

    wrapper = shallow(React.createElement(IdentifyPage, props));
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('a change in the national identity number triggers onChange', () => {
    const input = wrapper.find(Input);
    input.simulate('change');

    expect(handleChangeStub).to.have.been.calledOnce();
  });

  it('disables the submit button until a correct number is filled in', () => {
    let submit = wrapper.find(Button);

    expect(submit.props().disabled).to.equal(true, 'should be disabled first');
    wrapper.setProps({ prospect: { nationalIdNumber: '530524-2769' } });

    submit = wrapper.find(Button);
    expect(submit.props().disabled).to.equal(false, 'should be enabled after a valid national id number');
  });
});
