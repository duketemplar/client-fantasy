import React from 'react';
require('bootstrap/dist/css/bootstrap.css');
import '../create-customer.sass';
import { connect } from 'react-redux';
import store from '../../store';
import nordnetAPI from 'nordnet-next-api';
import { Grid, Col, Row } from 'react-bem-grid';
import { reduxForm, getValues  } from 'redux-form';
import ValidInput from '../input/valid-input.jsx';
import { combineValidators, lengthValidator, notBlankValidator, emailValidator, regexValidator } from '../../utils/validators';
import { Input, Button } from 'nordnet-ui-kit';

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

const saveProspectURL = '/api/2/customer-creation/prospect';

const validate = combineValidators(fields);

class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
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
                <ValidInput type="text" label="First name" fieldBinding={ firstName } />
                <ValidInput type="text" label="Last name" fieldBinding={ lastName } />
                <ValidInput type="text" label="Civic registration number" fieldBinding={ civicRegistrationNumber } />

                <Input  name="citizenship"
                        type="select"
                        label="Citizenship"
                        options={ countries }
                        />

                <ValidInput type="text" label="C/o" fieldBinding={ careOf } />
                <ValidInput type="text" label="Address" fieldBinding={ address } />
                <ValidInput type="text" label="Zip code" fieldBinding={ zipCode } />
                <ValidInput type="text" label="City" fieldBinding={ city } />
                <Input name="land" type="select" label="Country" options={ countries } />
                <ValidInput type="email" label="E-mail" fieldBinding={ email } />

                <Button type="submit" disabled={ submitting }>
                  { submitting ? <i/> : <i/> } Submit
                </Button>

                <Button disabled={ submitting } onClick={ resetForm }>
                  Clear values
                </Button>
            </Col>
          </form>
        </Col>
      </Grid>
    );
  }

  submitForm() {
    return new Promise((resolve, reject) => {
      nordnetAPI
        .post(saveProspectURL, getValues(store.getState().form.prospectInfo), '')
        .then(({status, data}) => {
          if (status == 200) {
            resolve();
          } else {
            reject()
          }
        }).then(() => {
          this.context.router.push({
            pathname: '/register/compliance',
          });
        }).catch((error) => {
          throw Error(`Could not post to ${saveProspectURL}`);
          reject();
        });
    });
  }
}

ProspectInfoPage.propTypes = {
  history: React.PropTypes.object,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

ProspectInfoPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'prospectInfo',
  fields: Object.keys(fields),
  validate: validate,
})(ProspectInfoPage);
