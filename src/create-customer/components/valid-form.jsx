import React from 'react';

export default class ValidForm extends React.Component {
  constructor(props) {
    super(props);

    this.data = { valid: false };
  }

  render() {
    return this.props.input;
  }

  validate(event) {
    this.data[event.target.name] = event.target.value;

    this.data.valid = true;

    this.props.dataUpdatedCb(() => this.data);
  }
}
