import React from 'react';
import {Modal, Button} from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');
import '../create-customer.sass';
import ContactInfo from './contact-info';
import RegulationData from './regulation-data';

export default class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
      paneIndex: 0,
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
            { React.createElement(this.panes[this.state.paneIndex], { dataUpdatedCb: this.enableNextStep.bind(this) }) }
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={ this.close.bind(this) }>
              Abort
            </Button>
            <Button onClick={ this.previous.bind(this) } disabled={ this.state.paneIndex === 0 }>
              Previous Step
            </Button>
            <Button onClick={ this.next.bind(this) } disabled={ !this.state.validForNextStep } bsStyle="primary">
              Next step
            </Button>
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
    const previousStep = this.state.paneIndex > 0 ? --this.state.paneIndex : this.state.paneIndex;
    this.setState({ paneIndex: previousStep });
  }

  next() {
    const nextStep = this.state.paneIndex < this.panes.length - 1 ? ++this.state.paneIndex : this.state.paneIndex;
    this.setState({ paneIndex: nextStep });
  }
}
