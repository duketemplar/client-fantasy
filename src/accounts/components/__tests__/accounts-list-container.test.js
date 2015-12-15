import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {i18n} from 'nordnet-i18n';
import AccountListContainer from '../accounts-list-container.jsx';

describe('accounts.components.AccountListContainer', () => {
  let node;

  const props = {
    messages: {
      LOADING: 'Loading',
    },
    accounts: [],
    formats: {},
    locales: ['en-US'],
  };

  function getDomNode() {
    const component = TestUtils.renderIntoDocument(React.createElement(i18n(AccountListContainer), props));
    return ReactDOM.findDOMNode(component);
  }

  describe('when isFetching = true', () => {
    beforeEach(() => {
      props.isFetching = true;
      props.fetchAccounts = sinon.spy();
      node = getDomNode();
    });

    it('calls fetchAccounts on componentDidMount', () => expect(props.fetchAccounts).to.have.been.called);

    it('shows loading name spinner', () =>  expect(node.textContent).to.include('Loading'));
  });

  describe('when isFetching = false', () => {
    beforeEach(() => {
      props.isFetching = false;
      props.fetchAccounts = sinon.spy();
      node = getDomNode();
    });

    it('calls fetchAccounts on componentDidMount', () => expect(props.fetchAccounts).to.have.been.called);

    it('shows does not show loading spinner', () =>  expect(node.textContent).to.not.include('Loading'));
  });
});
