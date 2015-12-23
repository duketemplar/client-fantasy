import React from 'react';
import {STEP_INFO, STEP_USER_DATA} from '../actions/action-types';
import store from '../../store';
import '../modal.scss';

export default class Info extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="info">
        <div className="header info--header">INFO: This is new crs stuff that you need to fill in....</div>
        <div className="body info--body">The reason for this is that....something...something...</div>
        <div className="buttons">
          <a className="button buttons--cancel" href="#" onClick={this.abort}>Cancel</a>
          <a className="button buttons--action" href="#" onClick={this.nextStep}>Next</a>
        </div>
      </div>
    );
  }

  abort(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_INFO});
  }

  nextStep(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_USER_DATA});
  }
}
