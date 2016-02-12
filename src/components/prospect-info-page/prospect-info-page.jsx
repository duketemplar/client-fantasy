import React from 'react';
import { Input, Submit } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import PhoneInput from 'react-phone';
require('bootstrap/dist/css/bootstrap.css');
import '../create-customer.sass';
import { connect } from 'react-redux';
import store from '../../store';
import { civicRegistrationNumberValidator } from '../../helpers/validators/index.js';
import nordnetAPI from 'nordnet-next-api';

class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      civicRegistrationNumber: '',
    };
  }

  render() {
    const countries = [
      {
        value: "se",
        label: "Sweden",
      },
      {
        value: "dk",
        label: "Denmark",
      },
    ];
    return (
      <Grid className="create-customer">

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

                <Input name="citizenship" type="select" label="Citizenship" placeholder="Sverige" options={ countries } />

                <Input name="careof" type="text" ref="careof" label="c/o" placeholder="Anders Andersson" />
                <Input name="address" type="text" ref="address" label="Address" placeholder="Stora Gatan 123" />
                <Input name="zip" type="text" ref="zip" label="Zip code" placeholder="123 23" />
                <Input name="city" type="text" ref="city" label="City" placeholder="Stockholm" />

                <Input name="land" type="select" label="Country" placeholder="Sverige" options={ countries } />

                <Input name="email" type="text" label="E-mail" placeholder="anna.svensson@email.com" addonBefore="@" />
                <PhoneInput label="Phone" name="phone" placeholder="070 123 45 67" />

                <input name="submit" type="submit" />
            </Col>
          </form>
        </Col>
      </Grid>
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

    const action = {
      step: 'SAVE_PROSPECT_INFO',
      value: registrationData
    };

    store.dispatch(action);

    // const url = '/next/2/customer-creation/registrations';
    // const params = registrationData;
    // const headers = '';

    // nordnetAPI
    // .post(url, params, headers)
    //   .then(({ data }) => {
    //     if (data.status === 'SUCCESS') {
    //       const action = {
    //         step: 'POST_PROSPECT_INFO',
    //         value: registrationData,
    //       };

    //       store.dispatch(action);
    //       this.props.history.pushState(null, '/register/compliance');
    //     } else {
    //       console.log('Prospect data is not valid! ', data.error);
    //     }
    //   })
    //   .catch(() => {
    //     throw Error(`Could not post to ${url}`);
    //   });
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
