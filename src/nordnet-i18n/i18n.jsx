import React from 'react';

export default (Component) => {
  class i18n extends React.Component {
    constructor(props, context) {
      super(props, context);
    }

    getChildContext() {
      return {
        messages: this.props.messages,
        locales: this.props.locales,
      };
    }

    render() {
      return (
        <Component { ...this.props } />
      );
    }
  }

  i18n.childContextTypes = {
    messages: React.PropTypes.object.isRequired,
    locales: React.PropTypes.array.isRequired,
  };

  return i18n;
};
