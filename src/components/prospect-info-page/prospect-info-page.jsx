/* jscs:disable maximumLineLength */
/* eslint-disable max-len */

import React from 'react';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import { Input } from 'nordnet-ui-kit';
import { createOrUpdateProspect, changeProspect } from '../../actions';
import { isEmptyValue } from '../../utils/validators';
import './prospect-info-page.scss';
import UpsBackground from '../../assets/images/flying-over-cloud--small.png';
import { intlFormatter } from '../../utils/format';
import { translatable } from 'nordnet-i18n';
import ReactPhoneInput from 'react-phone-input';
import ListBox from '../list-box';


export class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
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

  handlePhoneNumberChange(formattedNumber) {
    const prospectData = { phoneNumber: formattedNumber };
    this.props.dispatch(changeProspect(prospectData));
  }

  hasError(key) {
    return this.props.prospectValidations[key];
  }

  constructUspTexts() {
    return [
      'PROSPECT_INFO.USP_ITEM_1',
      'PROSPECT_INFO.USP_ITEM_2',
      'PROSPECT_INFO.USP_ITEM_3',
      'PROSPECT_INFO.USP_ITEM_4',
    ].map(i18n => this.props.getIntlMessage(i18n));
  }

  render() {
    return (
      <Grid className="prospect-info">
        <Row>
          <Col xs={ 12 } md={ 4 } mdLast className="prospect-info__usp">
            <ListBox
              header={ this.props.getIntlMessage('PROSPECT_INFO.USB_HEADING') }
              itemTexts={ this.constructUspTexts() }
              backgroundImage={ UpsBackground }
            />
          </Col>
          <Col xs={ 12 } md={ 8 } className="prospect-info__input">
            <h2>
              { this.props.getIntlMessage('PROSPECT_INFO.HEADING_SECONDARY') }
            </h2>
            <p>
              { this.props.getIntlMessage('PROSPECT_INFO.PREAMBLE_SECONDARY') }
            </p>
            <form onSubmit={ this.submitForm } >
              <div className="input prospect__input_phone" id="prospect-phone-number">
                <label className="input__label" htmlFor="prospect-phone-number">{ this.props.getIntlMessage('INPUT.PHONE.LABEL') }</label>
                <ReactPhoneInput
                  defaultCountry={'se'}
                  preferredCountries={ ['se', 'fi', 'no', 'dk'] }
                  onChange={ this.handlePhoneNumberChange }
                />
              </div>
              <Input
                id="prospect-email"
                className="prospect__input_email"
                type="email"
                label={ this.props.getIntlMessage('INPUT.EMAIL.LABEL')}
                value={ this.props.prospect.email }
                onChange={ this.buildHandleChange('email') }
                helpText={ intlFormatter(this.props.getIntlMessage, this.props.prospectValidations.email) }
                hasError={ this.hasError('email') }
                hasSuccess={ !this.hasError('email') && !isEmptyValue(this.props.prospect.email) }
              />
            </form>
          </Col>
        </Row>
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
