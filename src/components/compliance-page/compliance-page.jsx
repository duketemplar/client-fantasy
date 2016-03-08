import React from 'react';
import { Radio, Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import store from '../../store';
import { reduxForm, getValues } from 'redux-form';
import { combineValidators, regexValidator } from '../../utils/validators';
import nordenetAPI from 'nordnet-next-api';

export const fields = {
  crsObligated: [
    [regexValidator, /^(yes|no)$/, 'This question needs to be answered.'],
  ],
};

const validate = combineValidators(fields);

class CompliancePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      fields:
      { crsObligated },
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
                <h2>"Are you american sitizen or obligated to report income-tax outside Sweden?"</h2>
                { crsObligated.touched && crsObligated.error && <div style={ {color: 'red'} }>{ crsObligated.error } </div> }
              </Col>
            </Row>
            <Row>
              <Col xs={ 2 }>
                <label>No&nbsp;&nbsp;</label>
                <input type="radio" { ...crsObligated } value="no" label="no" checked={ crsObligated.value === 'no' } className="compliance__crs-obligated--no" />
              </Col>
              <Col xs={ 8 } xsOffset={ 1 }>
                <label>Yes&nbsp;&nbsp;</label>
                <input type="radio" { ...crsObligated } value="yes" label="yes" checked={ crsObligated.value === 'yes' } className="compliance__crs-obligated--yes" />
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

  submitForm() {
    const crsObligated = getValues(store.getState().form.complianceInfo).crsObligated;
    const header = { 'Content-type': 'application/json' };
    nordenetAPI
    .post('/v1/registrations', { dev: null, crsObligated }, header)
    .then(({ status }) => {
      if (status === 200) {
        this.context.router.push({
          pathname: "/register/pick-account",
        });
      }
    })
    .catch(error => console.log(error)); // eslint-disable-line no-console
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
