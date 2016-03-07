import React from 'react';
import { Input, Button } from 'nordnet-ui-kit';
import { Grid, Col, Radio } from 'react-bem-grid';
import { connect } from 'react-redux';
import store from '../../store';
import { reduxForm, getValues  } from 'redux-form';
import { combineValidators, lengthValidator, notBlankValidator, emailValidator, regexValidator } from '../../utils/validators';
import ValidInput from '../input/valid-input.jsx';

export const fields = {
  taxCountry: [
    [notBlankValidator, "Must be filled in."],
    [lengthValidator, 3, "Must be at least 2 characters."],
  ],
  taxTin: [
    [notBlankValidator, "Must be filled in."],
    [lengthValidator, 3, "Must be at least 2 characters."],
  ],
};

const validate = combineValidators(fields);

class CompliancePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      fields: {
        taxCountry,
        taxTin,
      },
      resetForm, handleSubmit, submitting
    } = this.props;

    return (
      <Grid className="compliance-info">
        <Col xs={ 12 }>
          <h1>
            Becoming a customer - Regulation Info
          </h1>

          <form onSubmit={ handleSubmit(this.submitForm.bind(this)) }>
            <h2>"Are you american sitizen, tax or obligated to report income-tax return in other country then Sweden?"</h2>
            <Col xs={ 6 }>
              <Radio label="No" />
              <Radio label="Yes" />

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

  submitForm() {
    this.context.router.push({
      pathname: "/register/pick-account",
    });
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
  validate: validate,
})(CompliancePage);
