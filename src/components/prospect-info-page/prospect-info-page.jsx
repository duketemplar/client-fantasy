import React from 'react';
import { Col, Row, Input, Glyphicon } from 'react-bootstrap';
import { PhoneInput } from '../input-fields';
require('bootstrap/dist/css/bootstrap.css');
import '../create-customer.sass';
import { connect } from 'react-redux';
import store from '../../store';
import { civicRegistrationNumberValidator } from '../../helpers/validators/index.js';
import nordnetAPI from 'nordnet-next-api';

const phoneGlyph = <Glyphicon glyph="earphone" />;

class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      civicRegistrationNumber: '',
    };
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
                <Input name="firstName" type="text" ref="firstName" label="First Name" placeholder="Anna" />
                <Input name="lastName" type="text" ref="lastName" label="Last Name" placeholder="Andersson" />

                <Input  name="civicRegistrationNumber" type="text"
                        ref="civicRegistrationNumber" label="Civic Registration Number"
                        placeholder="19890101-1234" />

                <Input name="citizenship" type="select" label="Citizenship" placeholder="Sverige">
                  <option value="se">Sverige</option>
                  <option value="dk">Danmark</option>
                </Input>

                <Input name="careof" type="text" ref="careof" label="c/o" placeholder="Anders Andersson" />
                <Input name="address" type="text" ref="address" label="Address" placeholder="Stora Gatan 123" />
                <Input name="zip" type="text" ref="zip" label="Zip code" placeholder="123 23" />
                <Input name="city" type="text" ref="city" label="City" placeholder="Stockholm" />

                <Input name="land" type="select" label="Country" placeholder="Sverige" >
                  <option value="se">Sverige</option>
                  <option value="dk">Danmark</option>
                </Input>

                <Input name="email" type="text" label="E-mail" placeholder="anna.svensson@email.com" addonBefore="@" />
                <PhoneInput label="Phone" name="phone" placeholder="070 123 45 67" />
                <Input name="submit" type="submit" />
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

    nordnetAPI
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
