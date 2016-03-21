/* jscs:disable maximumLineLength */
/* eslint-disable max-len */

import React from 'react';
import store from '../../store';
import nordnetAPI from 'nordnet-next-api';
import { Grid, Col, Row } from 'react-bem-grid';
import { reduxForm, getValues } from 'redux-form';
import ValidInput from '../input/valid-input.jsx';
import { combineValidators, lengthValidator, notBlankValidator, emailValidator } from '../../utils/validators';
import { Button } from 'nordnet-ui-kit';
import { CUSTOMERS_PROSPECTS_PATH } from '../../utils/endpoints';

export const fields = {
  phoneNumber: [
    [notBlankValidator, 'Must be filled in.'],
    [lengthValidator, 7, 'Must be at least 7 characters.'],
  ],
  email: [
    [notBlankValidator, 'Must not be blank.'],
    [emailValidator, 'Must be a valid email'],
  ],
};

const validate = combineValidators(fields);

export class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  submitForm() {
    const prospectId = store.getState().prospect.prospectId;
    const form = getValues(store.getState().form.prospectInfo);
    const customerCreationURI = `${CUSTOMERS_PROSPECTS_PATH}/${prospectId}`;
    const header = { 'Content-type': 'application/json; charset=utf-8' };
    const data = {
      /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
      email: form.email,
      phone_number: form.phoneNumber,
      /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
    };
    return new Promise((resolve) => {
      nordnetAPI
        .put(customerCreationURI, data, header)
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
    const {
      fields: {
        phoneNumber, email,
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
              <ValidInput type="text" label="Phone Number" fieldBinding={ phoneNumber } />
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
