import React from 'react';
import {STEP_ABORT, STEP_INFO, STEP_USER_DATA, STEP_SUBMIT} from '../actions/action-types';
import store from '../../store';
import '../modal.scss';
import _ from 'lodash';

export default class Confirm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { submitting: false};
  }

  renderWaitForSubmit() {
    return (
      <div className="processing">...processing</div>
    );
  }

  render() {
    const user = store.getState().user;

    return (
      <div className="confirm">
        { this.state.submitting ? this.renderWaitForSubmit() : '' }
        <div className="header confirm--header">CONFIRM: This was the things you filled in</div>
        <div className="body confirm--body">
          <div className="text">Do they look ok?</div>
          <div className="text">{ this.createUserAnswers(user.data) }</div>
        </div>
        <div className="buttons">
          <a className="button buttons--cancel" href="#" onClick={this.abort}>Cancel</a>
          <a className="button buttons--action" href="#" onClick={this.previousStep}>Previous</a>
          <a className="button buttons--action" href="#" onClick={this.submit.bind(this)}>Submit</a>
        </div>
      </div>
    );
  }

  createUserAnswers(data) {
    return _.map(data, (value, prop)=> {
      return (
        <div key={prop}>
          {prop} : {value}
        </div>
      );
    });
  }

  abort(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_ABORT});
  }

  previousStep(e) {
    e.preventDefault();
    store.dispatch({ step: STEP_USER_DATA});
  }

  submit(e) {
    e.preventDefault();
    this.setState({ submitting: true });

    const _this = this;
    window.setTimeout(()=> {
      _this.setState({submitting: false});
      store.dispatch({ step: STEP_SUBMIT});
    }, 2000);
  }
}
