import React from 'react';
import Section from './registration-section';
import ProspectInfoPage from '../prospect-info-page';
import CompliancePage from '../compliance-page';
import AccountPicker from '../account-picker';
import SignPage from '../sign-page';


export default class CustomerRegistration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="customer-registration">
        <Section element={ ProspectInfoPage } />
        <Section element={ CompliancePage } />
        <Section element={ AccountPicker } />
        <Section element={ SignPage } />
      </div>
    );
  }
}
