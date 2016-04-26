import React from 'react';
import Section from './registration-section';
import Header from '../header';
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
      <div className="customer-registration--background" style={ { backgroundImage: 'url(/assets/images/clouds.jpg)' } }>
        <div className="customer-registration--layer">
          <Section element={ Header } />
          <div className="customer-registration">
            <Section element={ ProspectInfoPage } />
            <Section element={ AccountPicker } />
            <Section element={ CompliancePage } />
            <Section element={ SignPage } />
          </div>
        </div>
      </div>
    );
  }
}
