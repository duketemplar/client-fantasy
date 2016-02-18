import React from 'react';
import { Input } from 'nordnet-ui-kit';


export default class ValidInput extends React.Component {
  constructor(props) {
    super(props);
  }

  helpTextFor(field) {
    console.log(field);
    return field.touched && field.error ? field.error : '';
  }

  errorFor(field) {
    return !!(field.touched && field.error);
  }

  render() {
    const { fieldBinding, ...rest } = this.props;

    return (
      <Input  helpText={ this.helpTextFor(fieldBinding) }
              hasError={ this.errorFor(fieldBinding) }
              { ...rest }
              { ...fieldBinding }
              />
    );
  }
}
