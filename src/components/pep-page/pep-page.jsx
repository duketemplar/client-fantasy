import './pep-page.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { reduxForm, getValues } from 'redux-form';
import { connect } from 'react-redux';
import { combineValidators, notBlankValidator, regexValidator } from '../../utils/validators';
import nordnetAPI from 'nordnet-next-api';
import { CUSTOMER_CREATION_URI } from '../../utils/endpoints';

export const fields = {
  pep: [
    [notBlankValidator, 'This question needs to be answered.'],
    [regexValidator, /^(true|false)$/, 'The answer provided is not a valid choice.'],
  ],
};

const validate = combineValidators(fields);

class PepPage extends React.Component {
  constructor(props) {
    super(props);
  }

  submitForm() {
    const prospectId = this.props.prospectId;
    const pep = getValues(this.props.form.pepInfo).pep;
    const header = { 'Content-type': 'application/json; charset=utf-8' };
    const regulationData = {
      is_pep: pep,
    };

    return new Promise((resolve, reject) => {
      nordnetAPI
        .put(CUSTOMER_CREATION_URI + `/prospects/${prospectId}`, { regulation: regulationData }, header)
        .then(({ status }) => {
          if (status === 200) {
            this.context.router.push({
              pathname: '/register/pick-account',
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
                  Har du, eller har du tidigare haft: en hög politisk statlig befattning eller
                  är nära familjemedlem eller medarbetare med en person i ovanstående befattning?
                </h2>
                <p>
                  För ytterligare information var god se blanketten <a href="https://www.nordnet.se/pdf/se/pep.pdf">här</a>.
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={ 1 }>
                <label>No&nbsp;&nbsp;</label>
                <input type="radio" { ...pep }
                  name="pep" value="false" label="false"
                  checked={ pep.value === 'false' }
                  className="compliance__pep--no"
                />
              </Col>
              <Col xs={ 1 } xsOffset={ 0 }>
                <label>Yes&nbsp;&nbsp;</label>
                <input type="radio" { ...pep }
                  name="pep" value="true" label="true"
                  checked={ pep.value === 'true' }
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
})(connect(select)(PepPage));

function select(store) {
  return {
    prospectId: store.prospect.meta.prospectId,
    pepInfo: store.form.pepInfo,
  };
}
