import React from 'react';
import Section from './registration-section';
import Header from '../header';
import ProspectInfoPage from '../prospect-info-page';
import CompliancePage from '../compliance-page';
import AccountPicker from '../account-picker';
import SignPage from '../sign-page';
import './customer-registration.scss';
import Clouds from '../../assets/images/clouds.jpg';

export default class CustomerRegistration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="customer-registration" style={ { backgroundImage: `url(${Clouds})` } }>
        <div className="customer-registration__overlay">
          <Section element={ Header } />
          <div className="customer-registration__container">
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
