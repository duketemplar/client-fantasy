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
import { intlFormatter } from '../../utils/format';
import { translatable } from 'nordnet-i18n';

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
    return this.props.prospectValidations[key];
  }

  render() {
    const invalidateMandatoryPhone = requiredFieldValidator('COMMON.ERROR.MANDATORY', this.props.prospect.phoneNumber);
    const invalidateMandatoryEmail = requiredFieldValidator('COMMON.ERROR.MANDATORY', this.props.prospect.email);

    return (
      <Grid className="prospect-info__page">
        <Grid className="create-customer prospect-info__component">
          <Row>
            <Col xs={ 7 }>
              <h2>
                { this.props.getIntlMessage('PROSPECT_INFO.HEADING_SECONDARY') }
              </h2>
              <p>
                { this.props.getIntlMessage('PROSPECT_INFO.PREAMBLE_SECONDARY') }
              </p>
              <form onSubmit={ this.submitForm } >
                <Input
                  className="prospect__input_phone"
                  type="text"
                  label={ this.props.getIntlMessage('INPUT.PHONE.LABEL') }
                  value={ this.props.prospect.phoneNumber }
                  onChange={ this.buildHandleChange('phoneNumber') }
                  helpText={ intlFormatter(this.props.getIntlMessage, this.props.prospectValidations.phoneNumber) }
                  hasError={ this.hasError('phoneNumber') }
                  hasSuccess={ !this.hasError('phoneNumber') && !invalidateMandatoryPhone }
                />
                <Input
                  className="prospect__input_email"
                  type="email"
                  label={ this.props.getIntlMessage('INPUT.EMAIL.LABEL')}
                  value={ this.props.prospect.email }
                  onChange={ this.buildHandleChange('email') }
                  helpText={ intlFormatter(this.props.getIntlMessage, this.props.prospectValidations.email) }
                  hasError={ this.hasError('email') }
                  hasSuccess={ !this.hasError('email') && !invalidateMandatoryEmail }
                />
              </form>
            </Col>
            <Col xs={ 5 } className="prospect__catcher">
              <div className="usp" style={ { backgroundImage: `url(${ UpsBackground })` } }>
                <div>
                  <h2 className="usp__headline">{ this.props.getIntlMessage('PROSPECT_INFO.USB_HEADING') }</h2>
                  <ul className="usp__items">
                    <li>{ this.props.getIntlMessage('PROSPECT_INFO.USP_ITEM_1') }</li>
                    <li>{ this.props.getIntlMessage('PROSPECT_INFO.USP_ITEM_2') }</li>
                    <li>{ this.props.getIntlMessage('PROSPECT_INFO.USP_ITEM_3') }</li>
                    <li>{ this.props.getIntlMessage('PROSPECT_INFO.USP_ITEM_4') }</li>
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
  getIntlMessage: React.PropTypes.func,
};

function select(state) {
  return {
    prospect: state.prospect,
    prospectValidations: state.prospectValidations,
  };
}

const ProspectInfoPageConnected = translatable(connect(select)(ProspectInfoPage));

export {
  ProspectInfoPageConnected as default,
  ProspectInfoPage,
};
