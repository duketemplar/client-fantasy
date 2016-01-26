import React from 'react';
import { Col, Row, Input } from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');
import '../create-customer.sass';
import { connect } from 'react-redux';
import store from '../../store';
import nordnetNext from 'nordnet-next-api';

class ProspectInfoPage extends React.Component {
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
                <Input name="firstName" type="text" ref="firstName" label="First Name" placeholder="First name" />
              </Row>
              <Row>
                <Input name="lastName" type="text" ref="lastName" label="Last Name" placeholder="Last name" />
              </Row>
              <Row>
                <Input name="civicRegistrationNumber" type="text" ref="civicRegistrationNumber" label="Civic Registration Number" placeholder="yyyymmdd-xxxx" />
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
    e.preventDefault();

    const prospectData = {
      firstName: this.refs.firstName.getValue(),
      lastName: this.refs.lastName.getValue(),
      civicRegistrationNumber: this.refs.civicRegistrationNumber.getValue(),
    };

    this.postRegistration(prospectData);
  }

  postRegistration(registrationData) {
    const url = '/next/2/customer-creation/registrations';
    const params = registrationData;
    const headers = '';

    nordnetNext
    .post(url, params, headers)
    .then(({ data }) => {
      if (data.status === 'SUCCESS') {
        const action = {
          step: 'POST_PROSPECT_INFO',
          value: registrationData,
        };

        store.dispatch(action);
        this.props.history.pushState(null, '/register/compliance');
      } else {
        console.log('Prospect data is not valid! ', data.error);
      }
    })
    .catch(() => {
      throw Error(`Could not post to ${url}`);
    });
  }
}

function reducerState(state) {
  return {
    step: state.steps,
    value: state.value,
  };
}

ProspectInfoPage.propTypes = {
  history: React.PropTypes.object,
};

export default connect(reducerState)(ProspectInfoPage);
