import React from 'react';
import Info from './Info';
import Summary from './Summary';
import Confirm from './Confirm';
import {STEP_INFO, STEP_SUMMARY, STEP_CONFIRM} from '../actions/action-types';

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
    return (
      <div className="modal">
        <div className="modal--shadow"></div>
        <div className="modal--content">
          <Info/>
        </div>
    </div>
    );
  }
}
