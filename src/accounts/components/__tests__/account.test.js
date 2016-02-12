import sinon from 'sinon';
import { expect } from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import { Account } from '../account';

describe('<Account />', () => {
  beforeEach(function () {
    this.spy = sinon.spy();
    this.component = shallow(<Account account={{ alias: 'alias' }} getIntlMessage={ this.spy } />);
  });

  it('should render alias once', function () {
    expect(this.component.find('.alias')).to.have.length(1);
  });

  it('should call getIntlMessage once', function () {
    expect(this.spy).to.have.been.calledOnce();
  });

  it('should call getIntlMessage with expected key', function () {
    expect(this.spy).to.have.been.calledWith('ACCOUNTS.ACCOUNT_NUMBER');
  });
});
