import { SignPage } from '../sign-page';
import React from 'react';
import { assert } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import actions from '../../../actions';

describe('<SignPage/>', () => {
  let wrapper;
  let props;
  let dispatchSpy;
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    dispatchSpy = sandbox.spy();

    props = {
      dispatch: dispatchSpy,
      sign: {},
      store: {},
      getIntlMessage: message => message,
    };

    wrapper = shallow(<SignPage { ...props } />);
  });

  afterEach(() => {
    sandbox.restore();
    wrapper = null;
  });

  /* #sign-do-signing
    wrapper.setProps({ regulation: { taxableOutsideJurisdiction: true } });
    expect(component.prop('show')).to.equal(false);
  */
  it('sign button should initially be disabled', () => {
    const component = wrapper.find('#sign-do-signing');
    assert(component.prop('disabled'), 'disabled is not true.');
  });

  it('sign button should transit to enabled when state agreement is accepted.', () => {
    wrapper.setProps({ sign: { acceptedAgreements: true } });
    const componentSign = wrapper.find('#sign-do-signing');

    assert(!componentSign.prop('disabled'), 'disabled is not false.');
  });

  it('sing button should be disabled when clicked', () => {
    const component = () => wrapper.find('#sign-do-signing');
    wrapper.setProps({ sign: { acceptedAgreements: true } });
    component().simulate('click');
    wrapper.setProps({ sign: { isSigning: true } });

    assert(component().prop('disabled'), 'disabled is not true.');
  });

  it('aggreement checkbox toggles the accepted agreement state', () => {
    const actionSpy = sandbox.spy(actions, 'toggleAcceptedAggreements');
    const component = wrapper.find('#sign-read-agreement-and-conditions');
    component.simulate('click', { target: { checked: true } });

    assert(actionSpy.calledWith(true), 'acceptedAgreements state has been updated.');
  });

  it('agreement checkbox should be disabled when sign button clicked', () => {
    const component = () => wrapper.find('#sign-do-signing');
    wrapper.setProps({ sign: { acceptedAgreements: true } });
    component().simulate('click');
    wrapper.setProps({ sign: { isSigning: true } });

    assert(wrapper.find('#sign-read-agreement-and-conditions').prop('disabled'), 'checkbox not disabled');
  });
});
