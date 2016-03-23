import React from 'react';
import './customer-registration.scss';

export default class Section extends React.Component {
  render() {
    const { element } = this.props;

    return (
      <div className="registration-section">
        { React.createElement(element) }
      </div>
    );
  }
}

Section.propTypes = {
  element: React.PropTypes.element.isRequired,
};
