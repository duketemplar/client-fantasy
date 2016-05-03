import React from 'react';
import { IntlMixin } from 'react-intl';

export default (Component) => {
  class Translatable extends React.Component {
    constructor(props, context) {
      super(props, context);
      this.getIntlMessage = IntlMixin.getIntlMessage.bind(this);
    }

    render() {
      return (<Component getIntlMessage={this.getIntlMessage} {...this.props} />);
    }
  }

  Translatable.contextTypes = {
    messages: React.PropTypes.object.isRequired,
    locales: React.PropTypes.array.isRequired,
  };

  return Translatable;
};
