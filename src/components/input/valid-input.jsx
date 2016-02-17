import React from 'react';
import { Input } from 'nordnet-ui-kit';


export default class ValidInput extends React.Component {
  constructor(props) {
    super(props);
  }

  helpTextFor(field) {
    return field.touched && field.error ? field.error : '';
  }

  errorFor(field) {
    return !!(field.touched && field.error);
  }

  render() {
    return (
      <Input  helpText={ this.helpTextFor(this.props.fieldBinding) }
              hasError={ this.errorFor(this.props.fieldBinding) }
              { ...this.props }
              { ...this.props.fieldBinding }
              />
    );
  }
}
