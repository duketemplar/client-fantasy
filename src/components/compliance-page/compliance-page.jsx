/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import React from 'react';
import { Button, Checkbox } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import TitledSelect from './titled-select';
import { MANUAL_FLOW_OPEN_ISK_PATH } from '../../utils/endpoints';
import './compliance-page.scss';
import { changeRegulation, changeKyc, changePep, createOrUpdateRegulation } from '../../actions';

const yesNoOptions = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
];

class CompliancePage extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {
    this.props.dispatch(createOrUpdateRegulation());
  }

  redirectToManualFlow() {
    window.location = location.origin + MANUAL_FLOW_OPEN_ISK_PATH;
    return false;
  }

  handleChange(key, value, actionGenerator) {
    const change = {};
    change[key] = value;
    this.props.dispatch(actionGenerator(change));
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
    return bool !== undefined && bool.toString();
  }

  render() {
    return (
      <Grid className="compliance">
        <Row>
          <Col xs={ 12 }>
            <h1>
              Becoming a customer - Regulation Info
            </h1>
          </Col>
        </Row>
        <Row>
            <form onSubmit={ this.submitForm }>

            <Row>
              <Col xs={6}>
                <TitledSelect
                  title="1. Are you obligated to report tax outside of Sweden?"
                  value={ this.safeBooleanToString(this.props.regulation.taxableOutsideJurisdiction) }
                  options={ yesNoOptions }
                  onChange={ this.buildHandleChange('taxableOutsideJurisdiction', changeRegulation, (e) => e.target.value !== 'false') }
                />

                <TitledSelect
                  title="2. Are you born in, obligated to report taxes in, or a citizen of, the United States of America?"
                  value={ this.safeBooleanToString(this.props.regulation.taxableOutsideJurisdiction) }
                  onChange={ this.buildHandleChange('taxableOutsideJurisdiction', changeRegulation, (e) => e.target.value !== 'false') }
                  options={ yesNoOptions }
                />

                <TitledSelect
                  title="3. What is your employment status?"
                  value={ this.props.kyc.employment_classification }
                  onChange={ this.buildHandleChange('employment_classification', changeKyc) }
                  options={ [
                    { label: 'Unemployed', value: 'unemployed' },
                    { label: 'Employed', value: 'employed' },
                    { label: 'Self employed', value: 'self employed' },
                  ]}
                />
                <TitledSelect
                  title="4. What is your yearly income?"
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

                <Row>
                  <h5>
                    5. What is the purpose of your savings with Nordnet?
                  </h5>
                  <Col xs={ 3 }>
                    <Checkbox label="Financial safety"/>
                    <Checkbox label="Private consumption"/>
                    <Checkbox label="For next of kin, e.g. children"/>
                  </Col>
                  <Col xs={ 3 }>
                    <Checkbox label="Pension"/>
                    <Checkbox label="Trading"/>
                  </Col>
                </Row>
              </Col>

              <Col xs={6}>
                <TitledSelect
                  title="6. From where does your funds, and or securities, originate?"
                  value={ this.props.kyc.economic_origin }
                  onChange={ this.buildHandleChange('economic_origin', changeKyc) }
                  options={
                    [
                      { label: 'Inheritance', value: 'inheritance' },
                      { label: 'Self acquired', value: 'self acquired' },
                    ]
                  }
                />
                <TitledSelect
                  title="7. What is the approximate yearly value of your deposits into this account?"
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
                  title="8. I have at present, or previously, held high political office in another nation, or have a close family member or associate who presently, or previously, has held such office in another nation?"
                  value={ this.safeBooleanToString(this.props.pep.isPep) }
                  onChange={ this.buildHandleChange('isPep', changePep, (e) => e.target.value !== 'false') }
                  options={ yesNoOptions }
                />
              </Col>
              <Col xs={ 12 } >
                <div className="horizontal-rule"></div>
                <Row>
                  <Checkbox label="I confirm that the above information is correct. Should this information change, I affirm that I shall notify Nordnet by changing this information under the settings page." />
                </Row>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Button className="compliance__submit" type="submit" primary >
                  Submit
                </Button>
                <Button secondary>
                  Clear values
                </Button>
              </Col>
              </Row>
            </form>
          </Row>
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
};

CompliancePage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    kyc: state.kyc,
    regulation: state.regulation,
    pep: state.pep,
  };
}

export default connect(select)(CompliancePage);
