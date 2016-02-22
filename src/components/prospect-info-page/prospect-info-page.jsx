import React from 'react';
require('bootstrap/dist/css/bootstrap.css');
import '../create-customer.sass';
import { connect } from 'react-redux';
import store from '../../store';
import nordnetAPI from 'nordnet-next-api';
import { Grid, Col, Row } from 'react-bem-grid';
import { reduxForm } from 'redux-form';
import ValidInput from '../input/valid-input.jsx';
import { combineValidators, lengthValidator, notBlankValidator, emailValidator, regexValidator } from '../../utils/validators';
import { Input } from 'nordnet-ui-kit';

export const fields = {
  firstName: [
    [regexValidator, /^[a-zA-Z.\s]+$/, "Must only contain letters"],
    [notBlankValidator, "Must be filled in."],
    [lengthValidator, 3, "Must be at least 2 characters."],
  ],
  lastName: [
    [notBlankValidator, "Must be filled in."],
    [lengthValidator, 3, "Must be at least 2 characters."],
  ],
  civicRegistrationNumber: [
    [notBlankValidator, "Must be filled in"],
    [lengthValidator, 10, "Must be at least 10 characters"],
  ],
  zipCode: [
    [notBlankValidator, "Must be filled in"],
    [lengthValidator, 4, "Must be at least 4 characters"],
  ],
  city: [
    [notBlankValidator, "Must be filled in"],
    [lengthValidator, 2, "Must be at least 2 characters"],
  ],
  address: [
    [notBlankValidator, "Must be filled in"],
    [lengthValidator, 2, "Must be at least 2 characters"],
  ],
  careOf: [
    [lengthValidator, 2, "Must be at least 2 characters"],
  ],
  email: [
    [notBlankValidator, "Must not be blank."],
    [emailValidator, "Must be a valid email"],
  ]
};

const validate = combineValidators.bind(null, fields);

class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  submitForm() {
    this.context.router.push({
      pathname: '/register/compliance',
    });
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

    const {
      fields: {
        lastName, firstName, civicRegistrationNumber, careOf, address, zipCode, email, city
      },
      resetForm, handleSubmit, submitting
    } = this.props;

    return (
      <Grid className="create-customer">

        <Col xs={12}>
          <Row>
            <h1>
              Enter your personal info
            </h1>
          </Row>
          <form onSubmit={ handleSubmit(this.submitForm.bind(this)) } >
            <Col xs={6}>
                <ValidInput type="text" label="First name" placeholder="First name" fieldBinding={ firstName } />
                <ValidInput type="text" label="Last name" placeholder="Last name" fieldBinding={ lastName } />
                <ValidInput type="text" label="Civic registration number" placeholder="19890101-1234" fieldBinding={ civicRegistrationNumber } />

                <Input  name="citizenship"
                        type="select"
                        label="Citizenship"
                        placeholder="Citizenship"
                        options={ countries }
                        />

                <ValidInput type="text" label="C/o" placeholder="C/o" fieldBinding={ careOf } />
                <ValidInput type="text" label="Address" placeholder="Address" fieldBinding={ address } />
                <ValidInput type="text" label="Zip code" placeholder="Zip code" fieldBinding={ zipCode } />
                <ValidInput type="text" label="City" placeholder="City" fieldBinding={ city } />
                <Input name="land" type="select" label="Country" placeholder="Sverige" options={ countries } />
                <ValidInput type="email" label="E-mail" placeholder="E-mail" fieldBinding={ email } />

                <button type="submit" disabled={ submitting }>
                  { submitting ? <i/> : <i/> } Submit
                </button>

                <button type="button" disabled={ submitting } onClick={ resetForm }>
                  Clear values
                </button>
            </Col>
          </form>
        </Col>
      </Grid>
    );
  }

  // formChanged(e) {
  //   const prospectData = { 
  //     firstName: {
  //       value: this.refs.firstName.getValue(),
  //     },
  //     lastName: {
  //       value: this.refs.lastName.getValue(),
  //     },
  //     email: {
  //       value: this.refs.email.getValue(),
  //     }
  //   };

  //   const action = {
  //     type: "UPDATE_PROSPECT_INFO",
  //     value: prospectData,
  //   }

  //   store.dispatch(action);
  // }

  // submitForm(e) {
    // e.preventDefault();

    // const prospectData = {
    //   firstName: this.refs.firstName.getValue(),
    //   lastName: this.refs.lastName.getValue(),
    //   civicRegistrationNumber: this.refs.civicRegistrationNumber.getValue(),
    // };

    // this.postRegistration(prospectData);
  // }

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

ProspectInfoPage.propTypes = {
  firstName: React.PropTypes.object,
  history: React.PropTypes.object,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

ProspectInfoPage.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'prospectInfo',
  fields: Object.keys(fields),
  validate: validate,
})(ProspectInfoPage);
