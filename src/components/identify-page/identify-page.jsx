import './identify-page.scss';

import React from 'react';

import { Input, Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';

import store from '../../store';

class IdentifyPage extends React.Component {
  handleSubmit(event) {
    event.preventDefault();

    const router = this.context.router;

    this.lookup(this.refs.nationalRegistrationNumber.value).then(result => {
      store.dispatch({ type: "IDENTIFIED_PERSON", value: result });
    }).then(() => {
      router.push('/register/contact-info');
    }).catch(e => {
      console.log(new Error().stack);
    });
  }

  lookup(nationalRegistrationNumber) {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        resolve({
          nationalRegistrationNumber: '1234',
          firstName: "Anna",
          lastName: "Andersson",
          address: "Stora Gatan 1",
          postalCode: "12323",
          city: "Stockholm",
          country: "Sweden",
        });
      }, 100);
    });
  }

  render() {
    return (
      <Grid className="identify-page">
        <Row xsMiddle xsCenter>
          <Col xs={ 6 }>
            <form onSubmit={ this.handleSubmit.bind(this) } >
              <Input type="text" ref="nationalRegistrationNumber" label="National registration number" />
              <Button primary type="submit">
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

IdentifyPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default IdentifyPage;
