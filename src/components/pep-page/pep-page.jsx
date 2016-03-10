import React from 'react';
// import nordnetAPI from 'nordnet-next-api';
import { Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { reduxForm } from 'redux-form';
// import store from '../../store';
import { notBlankValidator } from '../../utils/validators';
import ValidInput from '../input/valid-input.jsx';

export const fields = {
  pep: [
    [notBlankValidator, 'Must be filled in.'],
  ],
};

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
      handleSubmit, submitting,
    } = this.props;
    console.log(pep.value);
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
                <h2>"Are you american sitizen or obligated to report income-tax outside Sweden?"</h2>
              </Col>
              <Col xs={ 2 }>
                <label>No&nbsp;&nbsp;</label>
                <input type="radio" { ...pep } name="1" value="yes"
                  label="yes" checked={ pep.value === 'yes' }
                  className="compliance__pep--yes"
                />
              </Col>
              <Col xs={ 8 } xsOffset={ 1 }>
                <label>Yes&nbsp;&nbsp;</label>
                <input type="radio" { ...pep } name="1" value="no"
                  label="no" checked={ pep.value === 'no' }
                  className="compliance__pep--no"
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button className="compliance__submit" type="submit" primary disabled={ submitting }>
                  { submitting ? <i/> : <i/> } Submit
                </Button>
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
};

PepPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'pep',
  fields: Object.keys(fields),
})(PepPage);
