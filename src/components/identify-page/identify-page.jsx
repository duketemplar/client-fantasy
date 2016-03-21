/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import './identify-page.scss';
import React from 'react';
import { Button, Input } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import { changeProspect, createOrUpdateProspect } from '../../actions';

class IdentifyPage extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
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

  hasErrors() {
    return this.props.prospectValidations.natRegNo !== null && this.props.prospectValidations.natRegNo !== undefined;
  }

  render() {
    const {
      prospect,
      prospectValidations,
    } = this.props;

    const hasError = this.hasErrors();

    return (
      <Grid className="identify">
        <Row xsMiddle xsCenter>
          <Col xs={ 6 }>
            <form onSubmit={ this.submitForm } >
              <Input
                type="text"
                label="National registration number"
                value={ prospect.natRegNo }
                onChange={ this.handleChange }
                hasError={ hasError }
                hasSuccess={ !hasError && this.notBlank(prospect.natRegNo) }
                helpText={ prospectValidations.natRegNo }
              />
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
  prospect: React.PropTypes.object,
  prospectValidations: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

IdentifyPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    prospect: state.prospect,
    prospectValidations: state.prospectValidations,
  };
}

export default connect(select)(IdentifyPage);
