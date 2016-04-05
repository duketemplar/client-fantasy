/* global expect */
import InfoModal from '../info-modal';
import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

describe('info modal', () => {
  let wrapper;
  let sandbox;
  let onAcceptSpy;
  let onCancleSpy;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    onAcceptSpy = sinon.spy(() => false);
    onCancleSpy = sinon.spy(() => false);

    const props = {
      show: true,
      content: null,
      onAccept: onAcceptSpy,
      onCancle: onCancleSpy,
    };

    wrapper = shallow(<InfoModal {...props} />);
  });

  afterEach(() => {
    sandbox.restore();
    wrapper = null;
  });

  it('is hidden when property show is false', () => {
    wrapper.setProps({ show: false });
    expect(wrapper.type()).to.be.equal(null);
  });

  it('is shown when property show is true', () => {
    wrapper.setProps({ show: true });
    expect(wrapper.type()).not.to.be.equal(null);
  });

  it('displays the content', () => {
    const content = (<div><h2>header</h2><p>body</p></div>);
    wrapper.setProps({
      show: true,
      content,
    });

    const component = wrapper.find('.info-modal__content');

    expect(component.contains(content)).to.equal(true);
  });

  it('perform the accept callback when accept is clicked', () => {
    const accept = wrapper.find('.info-modal__action').childAt(0);

    wrapper.setProps({ show: true });
    accept.simulate('click');

    expect(onAcceptSpy.calledOnce).to.equal(true);
  });

  it('trigger cancle callback when cancle is triggered', () => {
    const cancle = wrapper.find('.info-modal__action').childAt(1);

    wrapper.setProps({ show: true });
    cancle.simulate('click');

    expect(onCancleSpy.calledOnce).to.equal(true);
  });

  it('trigger cancle callback when clicked outside modal', () => {
    const outsideModal = wrapper.find('.info-modal__background');

    wrapper.setProps({ show: true });
    outsideModal.simulate('click');

    expect(onCancleSpy.calledOnce).to.equal(true);
  });
});
