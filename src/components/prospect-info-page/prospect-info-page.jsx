/* jscs:disable maximumLineLength */
/* eslint-disable max-len */

import React from 'react';
import store from '../../store';
import nordnetAPI from 'nordnet-next-api';
import { Grid, Col, Row } from 'react-bem-grid';
import { reduxForm, getValues } from 'redux-form';
import ValidInput from '../input/valid-input.jsx';
import { combineValidators, lengthValidator, notBlankValidator, emailValidator, regexValidator } from '../../utils/validators';
import { Button } from 'nordnet-ui-kit';
import { CUSTOMERS_PROSPECTS_PATH } from '../../utils/endpoints';

export const fields = {
  firstName: [
    [regexValidator, /^[a-zA-Z.\s]+$/, 'Must only contain letters'],
    [notBlankValidator, 'Must be filled in.'],
    [lengthValidator, 3, 'Must be at least 2 characters.'],
  ],
  lastName: [
    [notBlankValidator, 'Must be filled in.'],
    [lengthValidator, 3, 'Must be at least 2 characters.'],
  ],
  zip: [
    [notBlankValidator, 'Must be filled in'],
    [lengthValidator, 4, 'Must be at least 4 characters'],
  ],
  city: [
    [notBlankValidator, 'Must be filled in'],
    [lengthValidator, 2, 'Must be at least 2 characters'],
  ],
  address1: [
    [notBlankValidator, 'Must be filled in'],
    [lengthValidator, 2, 'Must be at least 2 characters'],
  ],
  address2: [
    [notBlankValidator, 'Must be filled in'],
    [lengthValidator, 2, 'Must be at least 2 characters'],
  ],
  email: [
    [notBlankValidator, 'Must not be blank.'],
    [emailValidator, 'Must be a valid email'],
  ],
  natregno: [
    [notBlankValidator, 'Must not be blank.'],
  ],
  citizen: [
    [notBlankValidator, 'Must not be blank.'],
  ],
  country: [
    [notBlankValidator, 'Must not be blank.'],
  ],
};

const validate = combineValidators(fields);

export class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prefill: {},
    };
  }

  componentDidMount() {
    const prefill = store.getState().prospect.identification;

    this.setState({
      prefill,
    });

    if (prefill) {
      store.dispatch({ type: 'PROSPECT_PREFILL', value: prefill });
    }
  }

  submitForm() {
    const prospectId = store.getState().prospect.meta.prospectId;
    const customerCreationURI = `${CUSTOMERS_PROSPECTS_PATH}/${prospectId}`;
    const header = { 'Content-type': 'application/json; charset=utf-8' };
    return new Promise((resolve) => {
      nordnetAPI
        .put(customerCreationURI, getValues(store.getState().form.prospectInfo), header)
        .then(({ status }) => {
          if (status === 200) {
            resolve();
          }
        })
        .then(() => {
          this.context.router.push({
            pathname: '/register/compliance',
          });
        })
        .catch((error) => {
          throw Error(`Could not post to ${customerCreationURI}, ${error.message}`);
        })
        .catch(() => resolve());
    });
  }

  render() {
    const countries = [
      {
        value: 'se',
        label: 'Sweden',
      },
      {
        value: 'dk',
        label: 'Denmark',
      },
    ];

    const {
      fields: {
        lastName, firstName, address1, address2, zip, email, city, natregno, citizen, country,  // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
      },
      resetForm, handleSubmit, submitting,
    } = this.props;

    return (
      <Grid className="create-customer">
        <Col xs={12}>
          <Row>
            <h1>
              Enter your personal info
            </h1>
          </Row>
          <form onSubmit={ handleSubmit(this.submitForm.bind(this)) } >
            <Col xs={6}>
              <ValidInput prefilled={ this.state.prefill.natregno } type="text" label="National registration number" fieldBinding={ natregno } />
              <ValidInput prefilled={ this.state.prefill.firstName } type="text" label="First name" fieldBinding={ firstName } />
              <ValidInput prefilled={ this.state.prefill.lastName } type="text" label="Last name" fieldBinding={ lastName } />
              <ValidInput prefilled={ this.state.prefill.citizenship } type="select" label="Citizenship" options={ countries } fieldBinding={ citizen } />
              <ValidInput prefilled={ this.state.prefill.address1 } type="text" label="Address" fieldBinding={ address1 } />
              <ValidInput prefilled={ this.state.prefill.address2 } type="text" label="C/o" fieldBinding={ address2 } />
              <ValidInput prefilled={ this.state.prefill.zip } type="text" label="Postal code" fieldBinding={ zip } />
              <ValidInput prefilled={ this.state.prefill.city } type="text" label="City" fieldBinding={ city } />
              <ValidInput prefilled={ this.state.prefill.country } type="select" label="Country" options={ countries } fieldBinding={ country } />
              <ValidInput type="email" label="E-mail" fieldBinding={ email } />
              <Button type="submit" primary disabled={ submitting }>
                { submitting ? <i/> : <i/> } Submit
              </Button>
              <Button secondary disabled={ submitting } onClick={ resetForm }>
                Clear values
              </Button>
            </Col>
          </form>
        </Col>
      </Grid>
    );
  }
}

ProspectInfoPage.propTypes = {
  history: React.PropTypes.object,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

ProspectInfoPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'prospectInfo',
  fields: Object.keys(fields),
  validate,
})(ProspectInfoPage);
