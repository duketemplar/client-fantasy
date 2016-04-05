import { CompliancePage } from '../compliance-page';
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import InfoModal from '../../info-modal';

describe.only('Compliance section redirects', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      kyc: {},
      regulation: {},
      pep: {},
    };

    wrapper = shallow(<CompliancePage { ...props } />);
  });

  it('Modal is hidden initially', () => {
    const component = wrapper.find(InfoModal);

    expect(component.prop('show')).to.equal(false);
  });

  it('Shows modal with redirect when crs yes is answered', () => {
    wrapper.setProps({ regulation: { taxableOutsideJurisdiction: true } });

    const component = wrapper.find(InfoModal);
    expect(component.prop('show')).to.equal(true);
  });
});
