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
  email: [
    [notBlankValidator, 'Must not be blank.'],
    [emailValidator, 'Must be a valid email'],
  ],
  citizen: [
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
        email, citizen,
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
              <ValidInput prefilled={ this.state.prefill.citizenship } type="select" label="Citizenship" options={ countries } fieldBinding={ citizen } />
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
