import sinon from 'sinon';
import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import api from 'nordnet-next-api';
import { initialize, supportedLocales, translatable, i18n } from '../index';

describe('nordnet-i18n', () => {
  describe('initialize', () => {
    let sandbox;

    beforeEach(() => sandbox = sinon.sandbox.create());
    afterEach(() => sandbox.restore());

    beforeEach(() => {
      sandbox.stub(api, 'get', () => Promise.resolve({ language: 'en', country: 'gb' }));
    });

    const element = {
      getAttribute: (key) => ({ 'data-lang': 'sv', 'data-country': 'SE' })[key],
    };

    it('resolves to the locale', (done) => {
      initialize(element).then((locale) => {
        expect(locale).to.equal('sv-SE');
        done();
      }, done).catch(done);
    });
  });

  describe('supportedLocales', () => {
    it('returns an array of supported locales', () => {
      expect(supportedLocales()).to.eql(['sv-SE', 'fi-FI', 'sv-FI', 'nb-NO', 'no-NO', 'nn-NO', 'da-DK', 'en']);
    });
  });

  describe('using i18n together with translatable', () => {
    // Create the following tree of components:
    //
    //  i18n (root) - setup context
    //  Parent - just a dummy component to make sure context is working
    //  TranslatableMyComponent - wraps My component with props for i18n
    //  MyComponent
    class MyComponent extends React.Component {
      render() {
        return (<h1>{ this.props.getIntlMessage('SOME.KEY') }</h1>);
      }
    }

    MyComponent.propTypes = {
      getIntlMessage: React.PropTypes.func.isRequired,
    };

    const TranslatableMyComponent = translatable(MyComponent);

    /*eslint-disable */

    // we want to define two react component in the same file, hence disable the rule above
    class Parent extends React.Component {
      render() {
        return (<div><TranslatableMyComponent/></div>);
      }
    }
    /*eslint-enable */

    let domNode;

    function createDOMNode() {
      const props = {
        messages: {
          SOME: { KEY: 'Yes !' },
        },
        formats: {},
        locales: [],
      };
      const tree = TestUtils.renderIntoDocument(React.createElement(i18n(Parent), props));
      return ReactDOM.findDOMNode(tree);
    }

    beforeEach(() => domNode = createDOMNode());

    it('can translate things', () => {
      expect(domNode.textContent).to.equal('Yes !');
    });
  });
});
