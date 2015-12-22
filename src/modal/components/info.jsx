import React from 'react';
import {STEP_SUMMARY} from '../actions/action-types';
import store from '../../store';
import '../modal.scss';

export default class Info extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="info">
        <div className="info--header">This is new crs stuff that you need to fill in....</div>
        <div className="info--body">The reason for this is that....something...something...</div>
        <div className="info--button">
          <a className="button" href="#" onClick={this.abort}>Cancel</a>
          <a className="button" href="#" onClick={this.nextStep}>Next</a>
        </div>
      </div>
    );
  }

  nextStep(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_SUMMARY});
  }
}
