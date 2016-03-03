import './identify-page.scss';
import React from 'react';
import { Input, Button } from 'nordnet-ui-kit';
import ValidInput from '../input/valid-input.jsx';
import nordnetAPI from 'nordnet-next-api';
import { Grid, Col, Row } from 'react-bem-grid';
import { reduxForm, getValues  } from 'redux-form';
import { combineValidators, lengthValidator, notBlankValidator, emailValidator, regexValidator } from '../../utils/validators';
import store from '../../store';

export const fields = {
  natregno: [
    [notBlankValidator, "Must be filled in."],
  ]
}

const validate = combineValidators(fields);

class IdentifyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  getCustomerCreationUri(hostName) {
    const mapHost = {
      local: '/api/2/customer-creation',
      test: 'http://service-customer-creation.test.nordnet.se/v1',
      ci: 'http://service-customer-creation.ci.nordnet.se/v1',
    };

    const environment = encodeURI(hostName.split('.').slice(-3, -2).pop());

    return mapHost[environment] ? mapHost[environment] : mapHost.local;
  }

  submitForm(event) {
    const router = this.context.router;
    const natRegNo = getValues(store.getState().form.identify).natregno;

    this.lookup(natRegNo).then(result => {
      store.dispatch({ type: "IDENTIFIED_PERSON", value: result.prospect });
    }).then(() => {
      router.push('/register/contact-info');
    })
    .catch(e => {
      console.log(new Error().stack);
    });
  }

  lookup(natregno) {
      return new Promise((resolve, reject) => {
        nordnetAPI
          .post(this.getCustomerCreationUri(location.host) + '/prospects', { natregno: natregno }, '')
          .then(({status, data}) => {
            if (status == 200) {
              resolve(data);
            } else {
              reject();
            }
          });
      });
  }

  render() {
    const {
      fields: {
        natregno
      },
      resetForm, handleSubmit, submitting
    } = this.props;

    return (
      <Grid className="identify">
        <Row xsMiddle xsCenter>
          <Col xs={ 6 }>
            <form onSubmit={ handleSubmit(this.submitForm.bind(this)) } >
              <ValidInput type="text" label="National registration number" fieldBinding={ natregno } />
              <Button className="identify__submit" primary type="submit">
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

IdentifyPage.propTypes = {
  history: React.PropTypes.object,
  fields: React.PropTypes.object.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  resetForm: React.PropTypes.func.isRequired,
  submitting: React.PropTypes.bool.isRequired,
};

IdentifyPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default reduxForm({
  form: 'identify',
  fields: Object.keys(fields),
  validate: validate,
})(IdentifyPage);

