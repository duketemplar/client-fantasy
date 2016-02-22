import React from 'react';
import { Input } from 'nordnet-ui-kit';
import store from '../../store';

export default class CompliancePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="compliance-answers">

        <h1>Becoming a customer - Regulation Info</h1>

        <form onSubmit={ this.submitForm.bind(this) }>
          <Input name="taxCountry" type="text" ref="taxCountry" label="Tax Country" placeholder="Papau New Guinea" />
          <Input name="tin" type="text" ref="taxIdentificationNumber" label="Tax Identification Number" placeholder="234.23.000-WARREN-G" />
          <Input name="submit" type="submit" />
        </form>
      </div>
    );
  }

  submitForm(e) {
    e.preventDefault();

    const action = {
      step: 'POST_COMPLIANCE_INFO',
      value: {
        firstName: this.refs.taxCountry.getValue(),
        lastName: this.refs.taxIdentificationNumber.getValue(),
      },
    };

    store.dispatch(action);

    // this.props.history.pushState(null, '/register/sign');
  }
}

CompliancePage.propTypes = {
  history: React.PropTypes.object,
};
