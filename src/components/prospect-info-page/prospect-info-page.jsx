/* jscs:disable maximumLineLength */
/* eslint-disable max-len */

import React from 'react';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import { Button, Input } from 'nordnet-ui-kit';
import { createOrUpdateProspect, changeProspect } from '../../actions';
import { requiredFieldValidator } from '../../utils/validators';

export class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    this.props.dispatch(createOrUpdateProspect());
  }

  handleChange(key, e) {
    const change = {};
    change[key] = e.target.value;
    this.props.dispatch(changeProspect(change));
  }

  buildHandleChange(key) {
    return (e) => this.handleChange(key, e);
  }

  hasError(key) {
    return this.props.prospectValidations[key] !== null && this.props.prospectValidations[key] !== undefined;
  }

  render() {
    return (
      <Grid className="create-customer">
        <Col xs={12}>
          <Row>
            <h1>
              Enter your personal info
            </h1>
          </Row>
          <form onSubmit={ this.submitForm } >
            <Col xs={6}>
              <Input
                type="text"
                label="Phone Number"
                value={ this.props.prospect.phoneNumber }
                onChange={ this.buildHandleChange('phoneNumber') }
                helpText={ this.props.prospectValidations.phoneNumber }
                hasError={ this.hasError('phoneNumber') }
                hasSuccess={ !this.hasError('phoneNumber') && !requiredFieldValidator('Must be filled in.', this.props.prospect.phoneNumber) }
              />
              <Input
                type="email"
                label="E-mail"
                value={ this.props.prospect.email }
                onChange={ this.buildHandleChange('email') }
                helpText={ this.props.prospectValidations.email }
                hasError={ this.hasError('email') }
                hasSuccess={ !this.hasError('email') && !requiredFieldValidator('Must be filled in.', this.props.prospect.email) }
              />
            </Col>
            <Row>
              <Col xs={12}>
                <div className="compliance__buttons">
                  <Button className="compliance__submit" type="submit" primary >
                    Submit
                  </Button>
                  <Button secondary>
                    Clear values
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </Col>
      </Grid>
    );
  }
}

ProspectInfoPage.propTypes = {
  history: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  prospect: React.PropTypes.object,
  prospectValidations: React.PropTypes.object,
};

ProspectInfoPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    prospect: state.prospect,
    prospectValidations: state.prospectValidations,
  };
}

export default connect(select)(ProspectInfoPage);
