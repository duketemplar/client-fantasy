/* jscs:disable maximumLineLength */
import './pep-page.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { reduxForm, getValues } from 'redux-form';
import store from '../../store';
import { combineValidators, notBlankValidator, regexValidator } from '../../utils/validators';
import nordnetAPI from 'nordnet-next-api';
import { CUSTOMERS_REGULATIONS_PATH, MANUAL_FLOW_OPEN_ISK_PATH } from '../../utils/endpoints';
import InfoModal from '../../components/info-modal';

export const fields = {
  pep: [
    [notBlankValidator, 'This question needs to be answered.'],
    [regexValidator, /^(yes|no)$/, 'The answer provided is not a valid choice.'],
  ],
};

const validate = combineValidators(fields);

class PepPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
    };
  }

  updateRegulation(pep) {
    const header = { 'Content-type': 'application/json; charset=utf-8' };
    const router = this.context.router;
    const regulationData = {
      pep: {
        is_pep: pep !== 'no', // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
      },
    };

    return new Promise((resolve) => {
      nordnetAPI
        .post(CUSTOMERS_REGULATIONS_PATH, regulationData, header)
        .then(({ status }) => {
          if (status === 200) {
            router.push({
              pathname: '/register/pick-account',
            });
          }
        })
        .catch(error => {
          console.info('Could not update regulation details:', error); // eslint-disable-line no-console
        })
        .then(() => resolve());
    });
  }

  submitForm() {
    const pep = getValues(store.getState().form.pepInfo).pep;
    return pep !== 'no' ? this.setState({ showInfo: true }) : this.updateRegulation(pep);
  }

  render() {
    const {
      fields: {
        pep,
      },
      handleSubmit, submitting, resetForm,
    } = this.props;

    return (
      <Grid className="pep">
        <Row>
          <Col xs={ 12 }>
            <h1>
              Politically Exposed Person
            </h1>
          </Col>
        </Row>
        <Row>
          <form onSubmit={ handleSubmit(this.submitForm.bind(this)) }>
            <Row>
              <Col xs={ 12 }>
                <h2>
                  Have you, or have you ever had: a high political or government office position
                  or are a close family member or an employee of a person in the above position?
                </h2>
                <p>
                  For further information, please see the form <a href="https://www.nordnet.se/pdf/se/pep.pdf">here</a>.
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={ 1 }>
                <label>No&nbsp;&nbsp;</label>
                <input type="radio" { ...pep }
                  name="pep" value="no" label="no"
                  checked={ pep.value === 'no' }
                  className="compliance__pep--no"
                />
              </Col>
              <Col xs={ 1 } xsOffset={ 0 }>
                <label>Yes&nbsp;&nbsp;</label>
                <input type="radio" { ...pep }
                  name="pep" value="yes" label="yes"
                  checked={ pep.value === 'yes' }
                  className="compliance__pep--yes"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={ 12 }>
                { pep.touched && pep.error && React.createElement(
                  'div', { className: 'compliance__pep--error', style: { color: 'red' } }, pep.error
                ) }
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className="compliance__pep--button">
                  <Button className="compliance__submit" type="submit" primary disabled={ submitting }>
                    { submitting ? <i/> : <i/> } Submit
                  </Button>
                  <Button secondary disabled={ submitting } onClick={ resetForm }>
                    Clear values
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </Row>
        <InfoModal showInfo={ this.state.showInfo } />
      </Grid>
    );
  }
}

PepPage.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
  form: React.PropTypes.object.isRequired,
  prospectId: React.PropTypes.string,
};

PepPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'pepInfo',
  fields: Object.keys(fields),
  validate,
})(PepPage);
