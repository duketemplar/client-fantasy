/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import React from 'react';
import { Button, Checkbox } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import store from '../../store';
import { reduxForm, getValues } from 'redux-form';
import { combineValidators, notBlankValidator, regexValidator } from '../../utils/validators';
import nordnetAPI from 'nordnet-next-api';
import { CUSTOMERS_PROSPECTS_PATH, MANUAL_FLOW_OPEN_ISK_PATH } from '../../utils/endpoints';
import ValidInput from '../input/valid-input';
import TitledSelect from './titled-select';
import './compliance-page.scss';

export const fields = {
  taxableOutsideJurisdiction: [
    [notBlankValidator, 'This question needs to be answered.'],
    [regexValidator, /^(yes|no)$/, 'This question needs to be answered.'],
  ],
  USCitizen: [
    [notBlankValidator, 'This question needs to be answered.'],
  ],
  employment: [
    [notBlankValidator, 'This question needs to be answered.'],
  ],
  purpose: [
    [notBlankValidator, 'This question needs to be answered.'],
  ],
  income: [
    [notBlankValidator, 'This question needs to be answered.'],
  ],  
  sourceOfFunds: [
    [notBlankValidator, 'This question needs to be answered.'],
  ],  
  yearlyDeposits: [
    [notBlankValidator, 'This question needs to be answered.'],
  ],
  sourceOfFunds: [
    [notBlankValidator, 'This question needs to be answered.'],
  ],
  yearlyDeposits: [
    [notBlankValidator, 'This question needs to be answered.'],
  ],
  politicallyExposedPerson: [
    [notBlankValidator, 'This question needs to be answered.'],
  ],
};

const yesNoOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' }
];

const validate = combineValidators(fields);

class CompliancePage extends React.Component {
  constructor(props) {
    super(props);
  }

  submitForm() {
    const router = this.context.router;
    const prospectId = store.getState().prospect.meta.prospectId; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
    const taxableOutsideJurisdiction = getValues(store.getState().form.complianceInfo).taxableOutsideJurisdiction;

    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
    const regulationData = {
      taxable_outside_jurisdiction: taxableOutsideJurisdiction,
    };
    /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */

    const header = { 'Content-type': 'application/json; charset=utf-8' };

    function updateRegulation() {
      return new Promise((resolve) => {
        nordnetAPI
        .put(CUSTOMERS_PROSPECTS_PATH + `/${prospectId}`, { regulation: regulationData }, header)
        .then(({ status }) => {
          if (status === 200) {
            router.push({
              pathname: '/register/pep',
            });
          }
        })
        .catch(error => {
          console.info('Could not update regulation details:', error); // eslint-disable-line no-console
        })
        .then(() => resolve()); // releasing the submitting prop
      });
    }

    function redirectToManualFlow() {
      window.location = location.origin + MANUAL_FLOW_OPEN_ISK_PATH;
      return false;
    }

    return taxableOutsideJurisdiction === 'yes' ? redirectToManualFlow() : updateRegulation();
  }

  render() {
    const {
      fields:
      {
        taxableOutsideJurisdiction,
        USCitizen,
        employment,
        purpose,
        income,
        sourceOfFunds,
        yearlyDeposits,
        politicallyExposedPerson,
      },
      resetForm, handleSubmit, submitting,
    } = this.props;

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
            <form onSubmit={ handleSubmit(this.submitForm.bind(this)) }>

            <Row>
              <Col xs={6}>
                <TitledSelect
                  title='1. Are you obligated to report tax outside of Sweden?'
                  field={ taxableOutsideJurisdiction }
                  options={ yesNoOptions }
                  />

                <TitledSelect
                  title='2. Are you born in, obligated to report taxes in, or a citizen of, the United States of America?'
                  field={ USCitizen }
                  options={ yesNoOptions }
                  />

                <TitledSelect
                  title='3. What is your employment status?'
                  field={ employment }
                  options={ [
                    { label: 'Unemployed', value: 'unemployed' },
                    { label: 'Employed', value: 'employed' },
                    { label: 'Self employed', value: 'self employed' }
                  ]}
                  />
                <TitledSelect
                  title="4. What is your yearly income?"
                  field={ income }
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
                    <Checkbox label='Financial safety'/>
                    <Checkbox label='Private consumption'/>
                    <Checkbox label='For next of kin, e.g. children'/>
                  </Col>
                  <Col xs={ 3 }>
                    <Checkbox label='Pension'/>
                    <Checkbox label='Trading'/>
                  </Col>
                </Row>
              </Col>

              <Col xs={6}>
                <TitledSelect
                  title="6. From where does your funds, and or securities, originate?"
                  field={ sourceOfFunds }
                  options={
                    [
                      { label: 'Inheritance', value: 'inheritance' },
                      { label: 'Self acquired', value: 'self acquired' },
                    ]
                  }
                  />
                <TitledSelect
                  title="7. What is the approximate yearly value of your deposits into this account?"
                  field={ yearlyDeposits }
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
                  field={ politicallyExposedPerson }
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
                <Button secondary disabled={ submitting } onClick={ resetForm }>
                  Clear values
                </Button>
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

CompliancePage.propTypes = {
  history: React.PropTypes.object,
  handleSubmit: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

CompliancePage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'complianceInfo',
  fields: Object.keys(fields),
  validate,
})(CompliancePage);
