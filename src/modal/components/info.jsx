import React from 'react';
import {STEP_ABORT, STEP_USER_DATA} from '../actions/action-types';
import store from '../../store';
import '../modal.scss';

export default class Info extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="info">
        <div className="header info--header">In order do proceed you must fill in some extra data.</div>
        <div className="body info--body">
          This is because there has been a new law, stating that all customers must
          fill in extra information of where they live an pay taxes.
          <br/>
          <br/>
          This is so the tax authorities knows what you are up to...
        </div>
        <div className="buttons">
          <a className="button buttons--cancel" href="#" onClick={this.abort}>Cancel</a>
          <a className="button buttons--action" href="#" onClick={this.nextStep}>Next</a>
        </div>
      </div>
    );
  }

  abort(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_ABORT});
  }

  nextStep(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_USER_DATA});
  }
}
