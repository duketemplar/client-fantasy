import React from 'react';
import { createStore } from 'redux';
import {STEP_SUMMARY} from '../actions/action-types';
import steps from '../reducers/steps';

export default class Info extends React.Component {
  constructor(props) {
    super(props);

    this.store = createStore(steps);
  }

  render() {
    return (
      <div>
        <div>This is new crs stuff that you need to fill in....</div>
        <div>The reason for this is that....something...something...</div>
        <div onClick={this.nextStep}>Next</div>
      </div>
    );
  }

  nextStep() {
    this.store.dispatch({ step: STEP_SUMMARY});
  }
}
