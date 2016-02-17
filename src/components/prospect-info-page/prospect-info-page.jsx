import React from 'react';
require('bootstrap/dist/css/bootstrap.css');
import '../create-customer.sass';
import { connect } from 'react-redux';
import store from '../../store';
import nordnetAPI from 'nordnet-next-api';
import { Input, Submit } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import PhoneInput from 'react-phone';
import { reduxForm } from 'redux-form';
import ValidInput from '../input/valid-input.jsx';


export const fields = ['firstName', 'lastName', 'civicRegistrationNumber', 'country', 'careOf', 'zipCode', 'city', 'citizenship', 'email'];

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  return errors;
}

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

    const {fields: {lastName, firstName, civicRegistrationNumber}, resetForm, handleSubmit, submitting } = this.props;

    return (
      <Grid className="create-customer">

        <Col xs={12}>
          <Row>
            <h1>Becoming a customer - Contact Info</h1>
          </Row>
          <form onSubmit={ this.props.handleSubmit } /* onChange={ this.formChanged.bind(this) } */ >
            <Col xs={6}>

                <ValidInput type="text" label="First name" placeholder="First name" fieldBinding={ firstName } />

                <ValidInput type="text" label="Last name" placeholder="Last name" fieldBinding={ lastName } />

                <ValidInput type="text" label="Civic registration number" placeholder="19890101-1234" fieldBinding={ civicRegistrationNumber } />

                <Input  name="citizenship"
                        type="select"
                        label="Citizenship"
                        placeholder="Sverige"
                        options={ countries }
                        />

                <Input  name="careof"
                        type="text"
                        ref="careof"
                        label="c/o"
                        placeholder="Anders Andersson" 
                        />

                <Input  name="address"
                        type="text"
                        ref="address"
                        label="Address"
                        placeholder="Stora Gatan 123"
                        />

                <Input  type="text"
                        label="Zip code" 
                        placeholder="123 23"
                        />


                <Input name="city" type="text" ref="city" label="City" placeholder="Stockholm" />

                <Input name="land" type="select" label="Country" placeholder="Sverige" options={ countries } />

                <Input name="email" ref="email" type="text" label="E-mail" placeholder="anna.svensson@email.com" addonBefore="@" />

                <PhoneInput label="Phone" name="phone" placeholder="070 123 45 67" />

                <input name="submit" type="submit"  />
            </Col>
          </form>
        </Col>
      </Grid>
    );
  }

  formChanged(e) {
    const prospectData = { 
      firstName: {
        value: this.refs.firstName.getValue(),
      },
      lastName: {
        value: this.refs.lastName.getValue(),
      },
      email: {
        value: this.refs.email.getValue(),
      }
    };

    const action = {
      type: "UPDATE_PROSPECT_INFO",
      value: prospectData,
    }

    store.dispatch(action);
  }

  submitForm(e) {
    e.preventDefault();

    // const prospectData = {
    //   firstName: this.refs.firstName.getValue(),
    //   lastName: this.refs.lastName.getValue(),
    //   civicRegistrationNumber: this.refs.civicRegistrationNumber.getValue(),
    // };

    // this.postRegistration(prospectData);
  }

  // postRegistration(registrationData) {

  //   const action = {
  //     step: 'SAVE_PROSPECT_INFO',
  //     value: registrationData
  //   };

  //   store.dispatch(action);

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
  // }
}

function reducerState(state) {
  return {
    step: state.steps,
    value: state.value,
  };
}

ProspectInfoPage.propTypes = {
  firstName: React.PropTypes.object,
  history: React.PropTypes.object,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

// export default connect(reducerState)(ProspectInfoPage);

export default reduxForm({
  form: 'foobar',
  fields,
  validate,
})(ProspectInfoPage);
