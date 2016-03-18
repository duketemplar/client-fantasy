/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import './identify-page.scss';
import React from 'react';
import { Button, Input } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import { combineValidators, notBlankValidator, nationalRegistrationNumberValidator } from '../../utils/validators';
import { changeProspect, createOrUpdateProspect } from '../../actions'

class IdentifyPage extends React.Component {
  constructor(props) {
    super(props);
  }

  submitForm() {
    this.props.dispatch(createOrUpdateProspect());
  }

  handleChange(e) {
    this.props.dispatch(changeProspect({
      natRegNo: e.target.value,
    }));
  }

  notBlank(value) {
    return value !== undefined && value !== null && value !== '';
  }

  render() {
    const {
      prospect,
      prospect_validations,
    } = this.props;

    const hasError = prospect_validations.natRegNo != null;

    return (
      <Grid className="identify">
        <Row xsMiddle xsCenter>
          <Col xs={ 6 }>
            <form onSubmit={ this.submitForm.bind(this) } >
              <Input type="text" label="National registration number" value={ prospect.natRegNo } onChange={ this.handleChange.bind(this) } hasError={ hasError } hasSuccess={ !hasError && this.notBlank(prospect.natRegNo) } />
              { this.props.prospect_validations.natRegNo }
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
};

IdentifyPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    prospect: state.prospect,
    prospect_validations: state.prospect_validations,
  };
}

export default connect(select)(IdentifyPage);
