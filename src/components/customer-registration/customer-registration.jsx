import React from 'react';
import Section from './registration-section';
import ProspectInfoPage from '../prospect-info-page';
import CompliancePage from '../compliance-page';
import AccountPicker from '../account-picker';
import SignPage from '../sign-page';
import './customer-registration.scss';

export default class CustomerRegistration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="customer-registration">
        <div className="customer-registration__header">
          <img className="logo" src="../../assets/images/logo.svg" />
        </div>
        <Section element={ ProspectInfoPage } />
        <Section element={ AccountPicker } />
        <Section element={ CompliancePage } />
        <Section element={ SignPage } />
      </div>
    );
  }
}
