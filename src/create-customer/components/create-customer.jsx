import React from 'react';
import {Modal, Button} from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');

export default class CreateCustomer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: true,
    };
  }

  render() {
    return (
      <div>
        <Modal show={ this.state.showModal }>
          <Modal.Header>
            <Modal.Title>Becoming a customer - Contact Info</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Please fill in this....
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={ this.close.bind(this) }>Abort</Button>
            <Button bsStyle="primary">Next step</Button>
          </Modal.Footer>
      </Modal>
      </div>
    );
  }

  close() {
    this.setState({ showModal: false });
  }
}
