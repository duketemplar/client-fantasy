/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import './identify-page.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';
import ValidInput from '../input/valid-input.jsx';
import nordnetAPI from 'nordnet-next-api';
import { Grid, Col, Row } from 'react-bem-grid';
import { reduxForm, getValues } from 'redux-form';
import { combineValidators, notBlankValidator } from '../../utils/validators';
import store from '../../store';
import { CUSTOMERS_PROSPECTS_PATH } from '../../utils/endpoints';

export const fields = {
  natregno: [
    [notBlankValidator, 'Must be filled in.'],
  ],
};

const validate = combineValidators(fields);

class IdentifyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  submitForm() {
    const router = this.context.router;
    const natRegNum = getValues(store.getState().form.identify).natregno;
    const header = { 'Content-type': 'application/json; charset=utf-8' };
    const prospectData = {
      /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
      national_id_number: natRegNum,
      national_id_number_country_code: 'se',
      /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
    };

    return new Promise((resolve) => {
      nordnetAPI
      .post(CUSTOMERS_PROSPECTS_PATH, prospectData, header)
      .then(({ status, data }) => {
        if (status === 200) {
          store.dispatch({ type: 'PROSPECT_CREATED', value: { prospectId: data.prospect_id } }); // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
          store.dispatch({ type: 'IDENTIFIED_PERSON', value: data });
        }
      })
      .then(() => {
        router.push('/register/contact-info');
      })
      .catch(e => {
        console.log(e.stack); // eslint-disable-line no-console
      })
      .then(() => resolve());
    });
  }

  render() {
    const {
      fields: {
        natregno,
      },
      handleSubmit, submitting,
    } = this.props;

    return (
      <Grid className="identify">
        <Row xsMiddle xsCenter>
          <Col xs={ 6 }>
            <form onSubmit={ handleSubmit(this.submitForm.bind(this)) } >
              <ValidInput type="text" label="National registration number" fieldBinding={ natregno } />
              <Button className="identify__submit" primary type="submit" disabled={ submitting }>
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

IdentifyPage.propTypes = {
  history: React.PropTypes.object,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

IdentifyPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'identify',
  fields: Object.keys(fields),
  validate,
})(IdentifyPage);
