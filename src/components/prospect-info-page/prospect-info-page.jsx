/* jscs:disable maximumLineLength */
/* eslint-disable max-len */

import React from 'react';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import { Input } from 'nordnet-ui-kit';
import { createOrUpdateProspect, changeProspect } from '../../actions';
import { requiredFieldValidator } from '../../utils/validators';
import './prospect-info-page.scss';
import UpsBackground from '../../assets/images/flying-over-cloud--small.png';

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
      <Grid className="prospect-info__page">
        <Grid className="create-customer prospect-info__component">
          <Row>
            <Col xs={ 7 }>
              <h1 className="category__title">
                Hi!
              </h1>
              <p className="category__description">
                Fun that you decided to try our service. Fill in your contact info and continue
                downwards to open an account.
              </p>
              <form onSubmit={ this.submitForm } >
                <Input
                  className="prospect__input_phone"
                  type="text"
                  label="Phone Number"
                  value={ this.props.prospect.phoneNumber }
                  onChange={ this.buildHandleChange('phoneNumber') }
                  helpText={ this.props.prospectValidations.phoneNumber }
                  hasError={ this.hasError('phoneNumber') }
                  hasSuccess={ !this.hasError('phoneNumber') && !requiredFieldValidator('Must be filled in.', this.props.prospect.phoneNumber) }
                />
                <Input
                  className="prospect__input_email"
                  type="email"
                  label="E-mail"
                  value={ this.props.prospect.email }
                  onChange={ this.buildHandleChange('email') }
                  helpText={ this.props.prospectValidations.email }
                  hasError={ this.hasError('email') }
                  hasSuccess={ !this.hasError('email') && !requiredFieldValidator('Must be filled in.', this.props.prospect.email) }
                />
              </form>
            </Col>
            <Col xs={ 5 } className="prospect__catcher">
              <div className="usp" style={ { backgroundImage: `url(${ UpsBackground })` } }>
                <div>
                  <h2 className="usp__headline">It is easy as this:</h2>
                  <ul className="usp__items">
                    <li>Fill in contact details</li>
                    <li>Answer some questions</li>
                    <li>Approve aggrements and conditions</li>
                    <li>Sign with Bank Id or Mobile Bank Id</li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
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

function select(state) {
  return {
    prospect: state.prospect,
    prospectValidations: state.prospectValidations,
  };
}

const ProspectInfoPageConnected = connect(select)(ProspectInfoPage);

export {
  ProspectInfoPageConnected as default,
  ProspectInfoPage,
};
