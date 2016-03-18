/* jscs:disable maximumLineLength */
/* eslint-disable max-len */

import React from 'react';
import nordnetAPI from 'nordnet-next-api';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import { Button, Input } from 'nordnet-ui-kit';
import { createOrUpdateProspect, changeProspect } from '../../actions';

export class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  submitForm() {
    this.props.dispatch(createOrUpdateProspect());
  }

  handleChange(key, e) {
    const change = {};
    change[key] = e.target.value;
    this.props.dispatch(changeProspect(change));
  }

  render() {
    const countries = [
      {
        value: 'se',
        label: 'Sweden',
      },
      {
        value: 'dk',
        label: 'Denmark',
      },
    ];

    return (
      <Grid className="create-customer">
        <Col xs={12}>
          <Row>
            <h1>
              Enter your personal info
            </h1>
          </Row>
          <form onSubmit={ this.submitForm.bind(this) } >
            <Col xs={6}>
              <ValidInput type="text" label="Phone Number" fieldBinding={ phoneNumber } />
              <ValidInput type="email" label="E-mail" fieldBinding={ email } />
              <Button type="submit" primary disabled={ }>
                Submit
              </Button>
              <Button secondary>
                Clear values
              </Button>
            </Col>
          </form>
        </Col>
      </Grid>
    );
  }
}

ProspectInfoPage.propTypes = {
  history: React.PropTypes.object,
};

ProspectInfoPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    prospect: state.prospect,
  }
}

export default connect(select)(ProspectInfoPage);
