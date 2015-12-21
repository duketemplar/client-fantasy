import React from 'react';
import Info from './Info';
import Summary from './Summary';
import Confirm from './Confirm';

const step = {
  INFO: 1,
  SUMMARY: 2,
  CONFIRM: 3,
};

export default class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {step: step.INFO};
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
    return <div>Some pane of state</div>;
  }
}
