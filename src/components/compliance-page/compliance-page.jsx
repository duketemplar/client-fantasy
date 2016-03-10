/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import React from 'react';
import { Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import store from '../../store';
import { reduxForm, getValues } from 'redux-form';
import { combineValidators, notBlankValidator, regexValidator } from '../../utils/validators';
import nordenetAPI from 'nordnet-next-api';
import { CUSTOMER_CREATION_URI } from '../../utils/endpoints';

export const fields = {
  taxableOutsideJurisdiction: [
    [notBlankValidator, 'This question needs to be answered.'],
    [regexValidator, /^(yes|no)$/, 'This question needs to be answered.'],
  ],
};

const validate = combineValidators(fields);

class CompliancePage extends React.Component {
  constructor(props) {
    super(props);
  }

  submitForm() {
    const prospectId = store.getState().prospect.meta.prospectId; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
    const taxableOutsideJurisdiction = getValues(store.getState().form.complianceInfo).taxableOutsideJurisdiction;

    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    const regulationData = {
      taxable_outside_jurisdiction: taxableOutsideJurisdiction,
    };
    /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */

    const header = { 'Content-type': 'application/json; charset=utf-8' };

    return new Promise((resolve, reject) => {
      nordenetAPI
      .put(CUSTOMER_CREATION_URI + `/prospects/${prospectId}`, { regulation: regulationData }, header)
      .then(({ status }) => {
        if (status === 200) {
          this.context.router.push({
            pathname: '/register/pep',
          });
        } else {
          reject();
        }
      })
      .catch(error => console.log(error)); // eslint-disable-line no-console
    });
  }

  render() {
    const {
      fields:
      { taxableOutsideJurisdiction },
      resetForm, handleSubmit, submitting,
    } = this.props;

    return (
      <Grid className="compliance">
        <Row>
          <Col xs={ 12 }>
            <h1>
              Becoming a customer - Regulation Info
            </h1>
          </Col>
        </Row>
        <Row>
            <form onSubmit={ handleSubmit(this.submitForm.bind(this)) }>
            <Row>
              <Col xs={ 12 }>
                <h2>"Are you american citizen or obligated to report income-tax outside Sweden?"</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={ 2 }>
                <label>No&nbsp;&nbsp;</label>
                <input type="radio" { ...taxableOutsideJurisdiction } value="no" label="no" checked={ taxableOutsideJurisdiction.value === 'no' } className="compliance__crs-obligated--no" />
              </Col>
              <Col xs={ 8 } xsOffset={ 1 }>
                <label>Yes&nbsp;&nbsp;</label>
                <input type="radio" { ...taxableOutsideJurisdiction } value="yes" label="yes" checked={ taxableOutsideJurisdiction.value === 'yes' } className="compliance__crs-obligated--yes" />
              </Col>
              <Col xs={ 12 }>
              { taxableOutsideJurisdiction.touched && taxableOutsideJurisdiction.error && React.createElement('div', { style: { color: 'red' } }, taxableOutsideJurisdiction.error) }
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button className="compliance__submit" type="submit" primary disabled={ submitting }>
                  { submitting ? <i/> : <i/> } Submit
                </Button>
                <Button secondary disabled={ submitting } onClick={ resetForm }>
                  Clear values
                </Button>
              </Col>
              </Row>
            </form>
          </Row>
      </Grid>
    );
  }
}

CompliancePage.propTypes = {
  history: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

CompliancePage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'complianceInfo',
  fields: Object.keys(fields),
  validate,
})(CompliancePage);
