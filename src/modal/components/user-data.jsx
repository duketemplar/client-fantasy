import React from 'react';
import {STEP_INFO, STEP_CONFIRM} from '../actions/action-types';
import {USERDATA_UPDATE} from '../actions/action-types';
import store from '../../store';
import '../modal.scss';
import _ from 'lodash';

export default class UserData extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const userdata = store.getState().user.data;
    return (
      <div className="user-data">
        <div className="header user-data--header">USER_DATA: Please fill in this</div>
        <div className="body user-data--body">
          <div className="text">So we can register something about you</div>
          <form id="crs-data" className="form" ref={(ref) => this.userdataForm = ref}>
              <label htmlFor="tax-country">Country for tax: </label>
              <input id="tax-country" type="text" name="taxCountry" defaultValue={userdata.taxCountry}/>

              <label htmlFor="tin">Tax Identification Number: </label>
              <input id="tin" type="text" name="tin" defaultValue={userdata.tin}/>

              <label htmlFor="company-name">Company Name: </label>
              <input id="company-name" type="text" name="companyName" defaultValue={userdata.companyName}/>
          </form>
          </div>
        <div className="buttons">
          <a className="button buttons--cancel" href="#" onClick={this.abort}>Cancel</a>
          <a className="button buttons--action" href="#" onClick={this.previousStep}>Previous</a>
          <a className="button buttons--action" href="#" onClick={this.nextStep.bind(this)}>Next</a>
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
    const userdata = {};
    const userdtaForm = this.userdataForm;
    [].forEach.call(userdtaForm, (elem) => {
      elem.className = elem.className.replace(/error/, '');
      userdata[elem.name] = elem.value;
    });

    const error = this.validateUserData(userdata);

    if (!_.isEmpty(error)) {
      _.each(error, (msg, field)=> {
        userdtaForm.querySelector(`[name=${field}]`).className += ' error';
      });

      return;
    }

    store.dispatch({ step: STEP_CONFIRM, data: userdata, process: USERDATA_UPDATE});
  }

  validateUserData(data) {
    const fields = ['taxCountry', 'tin', 'companyName'];

    const error = {};
    fields.forEach((field)=> {
      if (data[field] === '') {
        error[field] = 'missing param';
      }
    });

    return error;
  }
}
