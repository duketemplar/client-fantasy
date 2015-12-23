import React from 'react';
import {STEP_INFO, STEP_CONFIRM} from '../actions/action-types';
import store from '../../store';
import '../modal.scss';

export default class UserData extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="user-data">
        <div className="header user-data--header">USER_DATA: Please fill in this</div>
        <div className="body user-data--body">
          <div className="text">So we can register something about you</div>
          <form className="form">
              <label htmlFor="tax-country">Country for tax: </label>
              <input id="tax-country" type="text" name="taxCountry"/>
              <label htmlFor="tin">Tax Identification Number: </label>
              <input id="tin" type="text" name="tin"/>
              <label htmlFor="company-name">Company Name: </label>
              <input id="company-name" type="text" name="companyName"/>
          </form>
          </div>
        <div className="buttons">
          <a className="button buttons--cancel" href="#" onClick={this.abort}>Cancel</a>
          <a className="button buttons--action" href="#" onClick={this.previousStep}>Previous</a>
          <a className="button buttons--action" href="#" onClick={this.nextStep}>Next</a>
        </div>
      </div>
    );
  }

  abort(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_INFO});
  }

  previousStep(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_INFO});
  }

  nextStep(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_CONFIRM});
  }
}
