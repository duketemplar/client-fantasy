import React from 'react';
import { Button, Col, Row, Input   } from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');
import '../create-customer.sass';
import ContactInfo from './contact-info';
import RegulationData from './regulation-data';
import { Link, browserHistory } from 'react-router';

export default class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="create-customer">

        <Col xs={12}>
          <Row>
            <h1>Becoming a customer - Contact Info</h1>
          </Row>

          <form onSubmit={ this.submitForm.bind(this) }>
            <Col xs={4}>
              <Row>
                <Input name="firstName" type="text" label="First Name" placeholder="Marcus" />
              </Row>
              <Row>
                <Input name="lastName" type="text" label="Last Name" placeholder="Berggren" />
              </Row>
              <Row>
                <Input name="civicRegistrationNumber" type="text" label="Civic Registration Number" placeholder="yyyymmdd-xxxx" />
              </Row>
              <Row>
                <Input name="submit" type="submit" />
              </Row>
            </Col>
          </form>
        </Col>
      </div>
    );
  }

  submitForm(e) {
    console.log("yolo");
    e.preventDefault();
    this.props.history.pushState(null, '/register/compliance');
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
