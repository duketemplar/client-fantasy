/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import React from 'react';
import { Checkbox } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import TitledSelect from './titled-select';
import { MANUAL_FLOW_OPEN_ISK_PATH } from '../../utils/endpoints';
import './compliance-page.scss';
import { changeRegulation, changeKyc, changePep, createOrUpdateRegulation } from '../../actions';
import InfoModal from '../info-modal';
import { translatable } from 'nordnet-i18n';

class CompliancePage extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.resetRegulation = this.resetRegulation.bind(this);
    this.yesNoOptions = this.yesNoOptions.bind(this);
  }


  getRedirectInfo() {
    return (
      <div className="compliance__redirect-info">
        <h1>
          { this.props.getIntlMessage('COMPLIANCE.MODAL.REDIRECT.HEADER') }
        </h1>
        <p>
          { this.props.getIntlMessage('COMPLIANCE.MODAL.REDIRECT.PREAMBLE') }
        </p>
      </div>
    );
  }
  yesNoOptions() {
    return (
      [
        { label: this.props.getIntlMessage('COMMON.YES'), value: 'yes' },
        { label: this.props.getIntlMessage('COMMON.NO'), value: 'no' },
      ]
    );
  }
  pepTitleText() {
    return (
      <p> { this.props.getIntlMessage('COMPLIANCE.PEP.HEADER') }</p>
    );
  }

  buildHandleChange(key, actionGenerator, transform) {
    return (e) => {
      let value;
      if (transform) {
        value = transform(e);
      } else {
        value = e.target.value;
      }
      this.handleChange(key, value, actionGenerator);
    };
  }

  safeBooleanToString(bool) {
    let ret;

    if (bool === true) {
      ret = 'yes';
    } else if (bool === false) {
      ret = 'no';
    } else {
      ret = '';
    }

    return ret;
  }


  handleChange(key, value, actionGenerator) {
    const change = {};
    change[key] = value;
    this.props.dispatch(actionGenerator(change));
  }

  redirectToManualFlow() {
    window.location = location.origin + MANUAL_FLOW_OPEN_ISK_PATH;
    return false;
  }

  submitForm() {
    this.props.dispatch(createOrUpdateRegulation());
  }

  resetRegulation() {
    const resetValues = {
      taxableOutsideJurisdiction: undefined,
    };

    this.props.dispatch(changeRegulation(resetValues));
  }

  render() {
    return (
      <Grid className="compliance__page">
        <h1 className="category__title">
          Customer knowledge
        </h1>
        <p className="category__description">
          By law, we as a bank to make an assessment of the risk to be used for money
          laundering or contribute to the financing of terrorism. In addition, there
          are laws governing the exchange of account information between countries.
          Therefore we need to ask these questions.
        </p>
        <Grid className="compliance__component">
          <InfoModal
            onAccept={ this.redirectToManualFlow }
            onCancel={ this.resetRegulation }
            content={ this.getRedirectInfo() }
            show={ !!this.props.regulation.taxableOutsideJurisdiction }
          />
          <Row>
            <form onSubmit={ this.submitForm }>
              <Row>
                <Col xs={6}>
                  <TitledSelect
                    className="compliance__question__taxable-outside-jursdiction"
                    title="1. Are you obligated to report tax outside of Sweden?"
                    value={ this.safeBooleanToString(this.props.regulation.taxableOutsideJurisdiction) }
                    options={ this.yesNoOptions() }
                    onChange={ this.buildHandleChange('taxableOutsideJurisdiction', changeRegulation, (e) => e.target.value !== 'no') }
                  />

                  <TitledSelect
                    className="compliance__question__taxable-in-usa"
                    title={ this.props.getIntlMessage('COMPLIANCE.TAXABLE_ABROAD.HEADER') }
                    value={ this.safeBooleanToString(this.props.regulation.taxableOutsideJurisdiction) }
                    onChange={ this.buildHandleChange('taxableOutsideJurisdiction', changeRegulation, (e) => e.target.value !== 'no') }
                    options={ this.yesNoOptions() }
                  />

                  <TitledSelect
                    className="compliance__question__employment-status"
                    title={ this.props.getIntlMessage('COMPLIANCE.EMPLOYMENT.HEADER') }
                    value={ this.props.kyc.employment_classification }
                    onChange={ this.buildHandleChange('employment_classification', changeKyc) }
                    options={ [
                      { label: this.props.getIntlMessage('COMPLIANCE.EMPLOYMENT.OPTION_EMPLOYED'), value: 'employed' },
                      { label: this.props.getIntlMessage('COMPLIANCE.EMPLOYMENT.OPTION_SELF_EMPLOYED'), value: 'self employed' },
                      { label: this.props.getIntlMessage('COMPLIANCE.EMPLOYMENT.OPTION_UNEMPLOYED'), value: 'unemployed' },
                    ]}
                  />
                  <TitledSelect
                    className="compliance__question__yearly-income"
                    title={ this.props.getIntlMessage('COMPLIANCE.YEARLY_INCOME.HEADER') }
                    value={ this.props.kyc.yearly_income }
                    onChange={ this.buildHandleChange('yearly_income', changeKyc) }
                    options={
                      [
                        { label: '0 - 100,000 SEK', value: '0 - 100,000 SEK' },
                        { label: '100,000 SEK - 500,000 SEK', value: '100,000 SEK - 500,000 SEK' },
                        { label: '500,000 SEK or more', value: '500,000 SEK or more' },
                      ]
                    }
                  />

                <Row className="compliance__question__purpose-of-saving checkbox__question">
                  <h3> { this.props.getIntlMessage('COMPLIANCE.PURPOSE.HEADER') } </h3>
                </Row>
                <Row className="checkbox__row">
                  <Checkbox className="compliance__anwser__financial-safety" label={ this.props.getIntlMessage('COMPLIANCE.PURPOSE.OPTION_FINANCE') }/>
                  <Checkbox className="compliance__anwser__private-consumption" label={ this.props.getIntlMessage('COMPLIANCE.PURPOSE.OPTION_PRIVATE') }/>
                  <Checkbox className="compliance__anwser__pension" label={ this.props.getIntlMessage('COMPLIANCE.PURPOSE.OPTION_PENSION') }/>
                  <Checkbox className="compliance__anwser__trading" label={ this.props.getIntlMessage('COMPLIANCE.PURPOSE.OPTION_TRADING') }/>
                  <Checkbox className="compliance__anwser__for-next-of-kin" label={ this.props.getIntlMessage('COMPLIANCE.PURPOSE.OPTION_KIN') }/>
                </Row>
                </Col>

                <Col xs={6}>
                  <TitledSelect
                    className="compliance__question__funds-and-securities-originate"
                    title = { this.props.getIntlMessage('COMPLIANCE.FUND_ORIGIN.HEADER') }
                    value={ this.props.kyc.economic_origin }
                    onChange={ this.buildHandleChange('economic_origin', changeKyc) }
                    options={
                      [
                        { label: this.props.getIntlMessage('COMPLIANCE.FUND_ORIGIN.OPTION_INHERIT'), value: 'inheritance' },
                        { label: this.props.getIntlMessage('COMPLIANCE.FUND_ORIGIN.OPTION_SELF'), value: 'self acquired' },
                      ]
                    }
                  />
                  <TitledSelect
                    className="compliance__question__yearly-value-of-deposits"
                    title = { this.props.getIntlMessage('COMPLIANCE.YEARLY_DEPOSIT.HEADER') }
                    value={ this.props.kyc.yearly_insert }
                    onChange={ this.buildHandleChange('yearly_insert', changeKyc) }
                    options={
                      [
                        { label: '0 - 100,000 SEK', value: '0 - 100,000 SEK' },
                        { label: '100,000 SEK - 500,000 SEK', value: '100,000 SEK - 500,000 SEK' },
                        { label: '500,000 SEK or more', value: '500,000 SEK or more' },
                      ]
                    }
                  />
                  <TitledSelect
                    title={ this.pepTitleText() }
                    className="compliance__question__politically-exposed-in-other-nation"
                    value={ this.safeBooleanToString(this.props.pep.isPep) }
                    onChange={ this.buildHandleChange('isPep', changePep, (e) => e.target.value !== 'no') }
                    options={ this.yesNoOptions() }
                  />
                </Col>
              </Row>
              <Row>
                <Row>
                  <Col xs={ 12 } >
                    <div className="horizontal-rule"></div>
                    <Row className="checkbox__confirm">
                      <Checkbox label="I confirm that the above information is correct. Should this information change, I affirm that I shall notify Nordnet by changing this information under the settings page." />
                    </Row>
                  </Col>
                </Row>
              </Row>
            </form>
          </Row>
        </Grid>
      </Grid>
    );
  }
}

CompliancePage.propTypes = {
  history: React.PropTypes.object,
  kyc: React.PropTypes.object,
  regulation: React.PropTypes.object,
  pep: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  getIntlMessage: React.PropTypes.func,
};

function select(state) {
  return {
    kyc: state.kyc,
    regulation: state.regulation,
    pep: state.pep,
  };
}

const CompliancePageConnected = translatable(connect(select)(CompliancePage));

export default CompliancePageConnected;
export {
  CompliancePage,
};
