import './pep-page.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
// import store from '../../store';
import { reduxForm } from 'redux-form';
import { combineValidators, notBlankValidator, regexValidator } from '../../utils/validators';
// import nordnetAPI from 'nordnet-next-api';
// import { CUSTOMER_CREATION_URI } from '../../utils/endpoints';

export const fields = {
  pep: [
    [notBlankValidator, 'This question needs to be answered.'],
    [regexValidator, /^(yes|no)$/, 'This question needs to be answered.'],
  ],
};

const validate = combineValidators(fields);

class PepPage extends React.Component {
  constructor(props) {
    super(props);
  }

  submitForm() {
    this.context.router.push({
      pathname: '/register/pick-account',
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
                <h2>"Are you a politically exposed person?"</h2>
              </Col>
            </Row>
            <Row>
              <Col xs={ 5 }>
                <label>No&nbsp;&nbsp;</label>
                <input type="radio" { ...pep }
                  name="pep" value="yes" label="yes"
                  checked={ pep.value === 'yes' }
                  className="compliance__pep--yes"
                />
              </Col>
              <Col xs={ 6 } xsOffset={ 1 }>
                <label>Yes&nbsp;&nbsp;</label>
                <input type="radio" { ...pep }
                  name="pep" value="no" label="no"
                  checked={ pep.value === 'no' }
                  className="compliance__pep--no"
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
  fields: React.PropTypes.object.isRequired,
  submitting: React.PropTypes.bool.isRequired,
  resetForm: React.PropTypes.func.isRequired,
};

PepPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'pep',
  fields: Object.keys(fields),
  validate,
})(PepPage);
