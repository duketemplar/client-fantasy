import React from 'react';
import {STEP_CONFIRM} from '../actions/action-types';
import store from '../../store';
import '../modal.scss';

export default class Summary extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="summary">
        <div className="summary--header">Pleace fill in this</div>
        <div className="summary--body">So we can register something about you...</div>
          <label>
            Field 1: <input type="text"/>
          </label>
          <label>
            Field 1: <input type="text"/>
          </label>
          <label>
            Field 1: <input type="text"/>
          </label>
        <div className="summary--button">
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
