/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import './identify-page.scss';
import React from 'react';
import { Button, Input } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import { changeProspect, createOrUpdateProspect } from '../../actions';
import { requiredFieldValidator } from '../../utils/validators';
import InfoModal from '../info-modal';
import { MANUAL_FLOW_OPEN_ISK_PATH } from '../../utils/endpoints';

class IdentifyPage extends React.Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
    this.resetProspect = this.resetProspect.bind(this);
  }

  getRedirectInfo() {
    return (
      <div className="oddity__redirect-info">
        <h1>
          Oddity Encountered
        </h1>
        <p>
          An oddity was encountered with the supplied national registration number,
          unable to retreive personal information with the number supplied.
          We ask that you apply via the extended manual process so that we can get
          complete personal details for your application.
        </p>
      </div>
    );
  }

  redirectToManualFlow() {
    window.location = location.origin + MANUAL_FLOW_OPEN_ISK_PATH;
  }

  resetProspect() {
    window.location.reload();
  }

  submitForm(e) {
    e.preventDefault();
    this.props.dispatch(createOrUpdateProspect('/begin', (data) => data.automatic === true));
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
        <InfoModal
          content={ this.getRedirectInfo() }
          onAccept={ this.redirectToManualFlow }
          onCancel={ this.resetProspect }
          show={ this.props.prospect.automatic === false }
        />
        <Row xsMiddle xsCenter>
          <Col xs={ 6 }>
            <form onSubmit={ this.submitForm } >
              <Input
                type="text"
                label="National registration number"
                value={ prospect.nationalIdNumber }
                onChange={ this.handleChange }
                hasError={ hasError }
                hasSuccess={ !hasError && !requiredFieldValidator('This question needs to be answered.', prospect.nationalIdNumber) }
                helpText={ prospectValidations.nationalIdNumber }
              />
              <Button className="identify__submit" primary type="submit" disabled={ hasError || !this.props.prospect.nationalIdNumber }>
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

// TODO: Remove router from context or else stub it in tests
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
export {
  IdentifyPage,
};
