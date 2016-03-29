/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import './identify-page.scss';
import React from 'react';
import { Button, Input } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import { changeProspect, createOrUpdateProspect } from '../../actions';
import { requiredFieldValidator } from '../../utils/validators';

class IdentifyPage extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }

  submitForm() {
    this.props.dispatch(createOrUpdateProspect());
    this.context.router.push('/begin'); // TODO: wait for an answer that everything is ok...
  }

  handleChange(e) {
    this.props.dispatch(changeProspect({
      nationalIdNumber: e.target.value,
    }));
  }

  hasErrors() {
    return this.props.prospectValidations.nationalIdNumber !== null && this.props.prospectValidations.nationalIdNumber !== undefined;
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
                value={ prospect.nationalIdNumber }
                onChange={ this.handleChange }
                hasError={ hasError }
                hasSuccess={ !hasError && requiredFieldValidator('This question needs to be answered.', prospect.nationalIdNumber) }
                helpText={ prospectValidations.nationalIdNumber }
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
