import '../initialize-intl';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import i18n from '../i18n.jsx';

describe('i18n', () => {
  function renderI18NParentWithProps(Component, props) {
    const App = i18n(Component);
    const tree = TestUtils.renderIntoDocument(
      <App {...props}/>
    );
    return tree;
  }

  function createComponentWithContextTypes() {
    return React.createClass({
      contextTypes: {
        messages: React.PropTypes.object.isRequired,
        locales: React.PropTypes.array.isRequired,
      },

      render() {return (<div/>); },
    });
  }

  const locales = [1, 2, 3];
  const messages = {baaz: 'baaz'};

  let component;

  beforeEach(() => {
    const Component = createComponentWithContextTypes();
    const tree = renderI18NParentWithProps(Component, {locales, messages});
    component = TestUtils.findRenderedComponentWithType(tree, Component);
  });

  describe('when parent is given property: "messages"', () => {
    it('expose the messages context', () => expect(component.context.messages).to.equal(messages));
  });

  describe('when parent is given property: "locales"', () => {
    it('expose the locales context', () => expect(component.context.locales).to.equal(locales));
  });
});
