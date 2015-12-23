import React from 'react';
import {STEP_INFO, STEP_USER_DATA, STEP_SUBMITTING} from '../actions/action-types';
import store from '../../store';
import '../modal.scss';

export default class Confirm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="confirm">
        <div className="header confirm--header">CONFIRM: This is new crs stuff that you need to fill in....</div>
        <div className="body confirm--body">The reason for this is that....something...something...</div>
        <div className="buttons">
          <a className="button buttons--cancel" href="#" onClick={this.abort}>Cancel</a>
          <a className="button buttons--action" href="#" onClick={this.previousStep}>Previous</a>
          <a className="button buttons--action" href="#" onClick={this.submit}>Submit</a>
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
    store.dispatch({ step: STEP_USER_DATA});
  }

  nextStep(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_SUBMITTING});
  }
}
