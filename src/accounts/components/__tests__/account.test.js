import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {i18n} from 'nordnet-i18n';
import Account from '../account';

describe('accounts.components.Account', () => {
  let node;

  beforeEach(() => {
    const props = {
      messages: {
        ACCOUNTS: {
          ACCOUNT_NUMBER: 'Account',
        },
      },
      formats: {},
      locales: ['en-US'],
      account: {
        alias: 'foo',
        accno: 123,
      },
    };

    const component = TestUtils.renderIntoDocument(React.createElement(i18n(Account), props));
    node = ReactDOM.findDOMNode(component);
  });

  it('translates ACCOUNTS.ACCOUNT_NUMBER', () => expect(node.textContent).to.include('Account'));
  it('shows account value', () => expect(node.textContent).to.include('100.00'));
  it('shows account alias', () =>  expect(node.textContent).to.include('foo'));
  it('shows account name', () =>  expect(node.textContent).to.include('Account: 123'));
});
