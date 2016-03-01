import React from 'react';
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
  ],
};

const validate = combineValidators(fields);

class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const prefill = store.getState().prospect.identification;

    console.log("prefill: ", prefill);

    if (!prefill) {
      return;
    }

    store.dispatch({ type: "PROSPECT_PREFILL", value: prefill});

    // const inputs = [].slice.call(document.getElementsByTagName('form')[0].querySelectorAll('input[name]'));

    // inputs.forEach(elem => {
    //   if (prefill[elem.name]) {
    //     elem.value = prefill[elem.name];
    //   }
    // });
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
                <Input name="citizenship" type="select" label="Citizenship" options={ countries } />
                <ValidInput type="text" label="C/o" fieldBinding={ careOf } />
                <ValidInput type="text" label="Address" fieldBinding={ address } />
                <ValidInput type="text" label="Zip code" fieldBinding={ zipCode } />
                <ValidInput type="text" label="City" fieldBinding={ city } />
                <Input name="land" type="select" label="Country" options={ countries } />
                <ValidInput type="email" label="E-mail" fieldBinding={ email } />
                <Button type="submit" primary disabled={ submitting }>
                  { submitting ? <i/> : <i/> } Submit
                </Button>
                <Button secondary disabled={ submitting } onClick={ resetForm }>
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
        .post(endpoints.SERVICE_CUSTOMER_CREATION + '/prospect', getValues(store.getState().form.prospectInfo), '')
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
          reject();
          throw Error(`Could not post to ${ endpoints.SERVICE_CUSTOMER_CREATION + '/prospect' }`);
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
