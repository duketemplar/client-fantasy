import React from 'react';
import {STEP_CONFIRM} from '../actions/action-types';
import store from '../../store';
import '../modal.scss';

export default class UserData extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="user-data">
        <div className="user-data--header">USER_DATA: Please fill in this</div>
        <div className="user-data--body">So we can register something about you...</div>
          <div><label>Field 1: </label><input type="text"/></div>
          <div><label>Field 2: </label><input type="text"/></div>
          <div><label>Field 3: </label><input type="text"/></div>
        <div className="user-data--button">
          <a className="button" href="#" onClick={this.abort}>Cancel</a>
          <a className="button" href="#" onClick={this.nextStep}>Next</a>
        </div>
      </div>
    );
  }

  nextStep(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_CONFIRM});
  }
}
