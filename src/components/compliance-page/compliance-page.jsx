/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import React from 'react';
import { Button, Checkbox } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import store from '../../store';
import { reduxForm, getValues } from 'redux-form';
import { combineValidators, notBlankValidator, regexValidator } from '../../utils/validators';
import nordnetAPI from 'nordnet-next-api';
import { CUSTOMERS_PROSPECTS_PATH, CUSTOMERS_REGULATIONS_PATH, MANUAL_FLOW_OPEN_ISK_PATH } from '../../utils/endpoints';
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
  income: [
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
  { label: 'No', value: 'no' },
];

const validate = combineValidators(fields);

class CompliancePage extends React.Component {
  constructor(props) {
    super(props);
  }

  submitForm() {
    const complianceInfo = getValues(store.getState().form.complianceInfo);

    if (complianceInfo.taxableOutsideJurisdiction === 'yes') {
      this.redirectToManualFlow();
    } else {
      return this.continueToNextStep(complianceInfo);
    }
  }

  continueToNextStep(complianceInfo) {
    const _this = this;
    const regulationData = {
      /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
      tax_info: {
        taxable_outside_jurisdiction: complianceInfo.taxableOutsideJurisdiction,
      },
      /* jscs:enable requireCamelCaseOrUpperCaseIdentifiers */
    };

    return new Promise((resolve) => {
      _this
      .validateRegulation(regulationData)
      .then(_this.updateProspect)
      .then(_this.context.router.push.bind(null, { pathname: '/register/pep' }))
      .catch(error => console.log(error)) // eslint-disable-line no-console
      .then(resolve); // make redux form change state of submitting
    });
  }

  redirectToManualFlow() {
    window.location = location.origin + MANUAL_FLOW_OPEN_ISK_PATH;
    return false;
  }

  updateProspect() {
    const prospectId = store.getState().prospect.prospectId;
    const regulationId = store.getState().prospect.regulationId;
    const prospectData = { regulation_id: regulationId }; // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
    const header = { 'Content-type': 'application/json; charset=utf-8' };

    return new Promise((resolve, reject) => {
      nordnetAPI
      .put(CUSTOMERS_PROSPECTS_PATH + `/${prospectId}`, prospectData, header)
      .then(({ status }) => {
        if (status === 200) {
          resolve();
        } else {
          reject(new Error('Could not update prospect.'));
        }
      })
      .catch(error => reject(error));
    });
  }

  validateRegulation(regulationData) {
    const header = { 'Content-type': 'application/json; charset=utf-8' };

    return new Promise((resolve, reject) => {
      nordnetAPI
      .post(CUSTOMERS_REGULATIONS_PATH, regulationData, header)
      .then(({ status, data }) => {
        if (status === 200) {
          store.dispatch({ type: 'REGULATION_VALIDATED', value: data.regulation_id }); // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
          resolve();
        } else {
          reject(new Error('No regulation id recieved.'));
        }
      })
      .catch(error => reject(error));
    });
  }

  render() {
    const {
      fields:
      {
        taxableOutsideJurisdiction,
        USCitizen,
        employment,
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
                  title="1. Are you obligated to report tax outside of Sweden?"
                  field={ taxableOutsideJurisdiction }
                  options={ yesNoOptions }
                />

                <TitledSelect
                  title="2. Are you born in, obligated to report taxes in, or a citizen of, the United States of America?"
                  field={ USCitizen }
                  options={ yesNoOptions }
                />

                <TitledSelect
                  title="3. What is your employment status?"
                  field={ employment }
                  options={ [
                    { label: 'Unemployed', value: 'unemployed' },
                    { label: 'Employed', value: 'employed' },
                    { label: 'Self employed', value: 'self employed' },
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
                <Button className="compliance__submit" type="submit" primary disabled={ submitting }>
                  { submitting ? <i/> : <i/> } Submit
                </Button>
                <Button secondary disabled={ submitting } onClick={ resetForm }>
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
  handleSubmit: React.PropTypes.func.isRequired,
  fields: React.PropTypes.object.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

CompliancePage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

const CompliancePageReduxForm = reduxForm({
  form: 'complianceInfo',
  fields: Object.keys(fields),
  validate,
})(CompliancePage);

export {
  CompliancePageReduxForm as default,
  CompliancePage,
};
