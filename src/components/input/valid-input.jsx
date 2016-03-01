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
    const { fieldBinding, prefilled, ...rest } = this.props;

    return (
      <Input  disabled={ !!prefilled }
              helpText={ this.helpTextFor(fieldBinding) }
              hasError={ this.errorFor(fieldBinding) }
              { ...rest }
              { ...fieldBinding }
              />
    );
  }
}
