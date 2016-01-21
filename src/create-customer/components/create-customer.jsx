import React from 'react';
import {Modal, Button} from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');
import '../create-customer.sass';
import ContactInfo from './contact-info';
import RegulationData from './regulation-data';

export default class CreateCustomer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      paneIndx: 0,
      validForNextStep: false,
    };

    this.panes = [ContactInfo, RegulationData];
  }

  render() {
    return (
      <div className="create-customer">
        <Modal show={ this.state.showModal }>
          <Modal.Header>
            <Modal.Title>Becoming a customer - Contact Info</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            { React.createElement(this.panes[this.state.paneIndx], { dataUpdatedCb: this.enableNextStep.bind(this) }) }
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={ this.close.bind(this) }>Abort</Button>
            <Button onClick={ this.previous.bind(this) } disabled={ this.state.paneIndx === 0 }>Previous Step</Button>
            <Button onClick={ this.next.bind(this) } disabled={ !this.state.validForNextStep } bsStyle="primary">Next step</Button>
          </Modal.Footer>
      </Modal>
      </div>
    );
  }

  close() {
    this.setState({ showModal: false });
  }

  enableNextStep(cb) {
    const data = cb();

    if (data.valid) {
      this.setState({ validForNextStep: true });
    }
  }

  previous() {
    const previousStep = this.state.paneIndx > 0 ? --this.state.paneIndx :  this.state.paneIndx;
    this.setState({ paneIndx: previousStep });
  }

  next() {
    const nextStep = this.state.paneIndx < this.panes.length - 1 ? ++this.state.paneIndx :  this.state.paneIndx;
    this.setState({ paneIndx: nextStep });
  }
}
