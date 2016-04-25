/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import React from 'react';
import { Button, Checkbox } from 'nordnet-ui-kit';
import { Grid, Row, Col } from 'react-bem-grid';
import { connect } from 'react-redux';
import { toggleAcceptedAggreements, freezeProspect, updateSign } from '../../actions';
import './sign-page.scss';
import UspBackground from './open-landscape-gazing.png';
import DocumentIcon from './document-icon.svg';
import InfoModal from '../info-modal';
import { SIGNED_IN_PATH } from '../../utils/endpoints';

class SignPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSigning: false,
    };

    this.handleSign = this.handleSign.bind(this);
    this.handleAcceptTermsAndConditions = this.handleAcceptTermsAndConditions.bind(this);
    this.getTermsAndCondition = this.getTermsAndCondition.bind(this);
    this.cancelSign = this.cancelSign.bind(this);
  }

  getTermsAndCondition() {
    const termsAndConditionLink = <a href="#" onClick={ this.alert('This is the terms and conditions...') }>terms and conditions</a>;
    return (
      <div>
        I have read and accepted the current { termsAndConditionLink } and I do solemnly swear that above filled is correct.
        In case of changes i will update my info under my settings when i have logged in.
      </div>
    );
  }

  getSignicatMock() {
    return (
      <div className="signicat__mock">
        <h2>
          Signicat
        </h2>
        <p>
          This is a mock for signicat. Press Continue to sign.
        </p>
      </div>
    );
  }

  handleAcceptTermsAndConditions(event) {
    this.props.dispatch(toggleAcceptedAggreements(event.target.checked));
  }

  handleSign() {
    this.props.dispatch(updateSign({ isSigning: true }));
    this.props.dispatch(freezeProspect());
  }

  alert(msg) {
    return (event) => {
      event.preventDefault();
      alert(msg); //eslint-disable-line no-alert
    };
  }

  redirectToSignedIn() {
    window.location = location.origin + SIGNED_IN_PATH;
  }

  cancelSign() {
    this.props.dispatch(updateSign({ isSigning: false }));
  }

  render() {
    return (
      <Grid className="sign">
        <InfoModal
          content={ this.getSignicatMock() }
          onAccept={ this.redirectToSignedIn }
          onCancel={ this.cancelSign }
          show={ this.props.sign.isSigning === true }
        />
        <Row>
          <Col xs={ 12 }>
            <div className="sign__header">
              <h3>
                Terms & conditions
              </h3>
              <p>
                These contain information about the account, risk of securities and guarantees
                you as a customer of our bank. Please read and accept before you sign.
              </p>
            </div>
            <div className="usp-sign" style={ { backgroundImage: `url(${UspBackground})` } }>
              <div className="usp-sign__container">
                <h3>Comfortable and secure for you</h3>
                <ul>
                  <li>No account charges</li>
                  <li>When trading shares the courtage starts at 1BTC</li>
                  <li>When trading founds you only pay for the found companys yearly fee</li>
                  <li>Your accounts is secured by the state</li>
                </ul>
              </div>
            </div>
            <div className="terms-and-conditions">
              <div>
                <Button
                  className="terms-and-conditions__fetcher"
                  secondary
                  onClick={ this.alert('This will show some pdfs...') }
                  style={ { backgroundImage: `url(${DocumentIcon})` } }
                >
                  Agreements and Conditions (PDF)
                </Button>
                <p className="terms-and-conditions__agreements-and-conditions-info">
                  All agreements and conditions will also be sent to your email.
                </p>
              </div>
              <div className="horizontal-rule"></div>
              <div className="terms-and-conditions__accept">
                <Checkbox
                  id="sign-read-agreement-and-conditions"
                  label={ this.getTermsAndCondition() }
                  checked={ this.props.sign.acceptedAgreements }
                  onClick={ this.handleAcceptTermsAndConditions }
                  disabled={ this.props.sign.isSigning }
                />
              </div>
            </div>
            <div className="sign__action">
              <Button id="sign-do-signing" onClick={ this.handleSign } disabled={ !this.props.sign.acceptedAgreements || this.props.sign.isSigning } primary>Sign</Button>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

SignPage.propTypes = {
  dispatch: React.PropTypes.func,
  sign: React.PropTypes.object,
  prospect: React.PropTypes.object,
};

function select(state) {
  return {
    prospect: state.prospect,
    sign: state.sign,
  };
}
const SignPageConnected = connect(select)(SignPage);

export default SignPageConnected;
export {
  SignPage,
};
