import React from 'react';
import { createStore } from 'redux';
import Info from './Info';
import Summary from './Summary';
import Confirm from './Confirm';
import steps from '../reducers/steps';
import {STEP_INFO, STEP_SUMMARY, STEP_CONFIRM} from '../actions/action-types';

//const store = createStore(steps);
//store.dispatch({ step: STEP_INFO});

export default class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {step: STEP_INFO};
  }

  getInfoPane() {
    return <Info />;
  }

  getSummaryPane() {
    return <Summary />;
  }

  getConfirmPane() {
    return <Confirm />;
  }

  render() {
    //console.log('Store: ', store.getState().step);

    return (
      <Info/>
    );
  }
}
