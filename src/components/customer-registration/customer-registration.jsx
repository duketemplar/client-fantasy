import React from 'react';
import Section from './registration-section';
import ProspectInfoPage from '../prospect-info-page';
import CompliancePage from '../compliance-page';
import StaticAccountPage from '../static-account-page';
import SignPage from '../sign-page';


export default class CustomerRegistration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="customer-registration">
        <Section element={ ProspectInfoPage } />
        <Section element={ StaticAccountPage } />
        <Section element={ CompliancePage } />
        <Section element={ SignPage } />
      </div>
    );
  }
}
