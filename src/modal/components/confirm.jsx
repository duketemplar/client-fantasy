import React from 'react';
import {STEP_CONFIRM} from '../actions/action-types';
import store from '../../store';
import '../modal.scss';

export default class Confirm extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="confirm">
        <div className="confirm--header">CONFIRM: This is new crs stuff that you need to fill in....</div>
        <div className="confirm--body">The reason for this is that....something...something...</div>
        <div className="confirm--button">
          <a className="button" href="#" onClick={this.abort}>Cancel</a>
          <a className="button" href="#" onClick={this.nextStep}>Next</a>
        </div>
      </div>
    );
  }

  nextStep(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_SUBMITTING});
  }
}
