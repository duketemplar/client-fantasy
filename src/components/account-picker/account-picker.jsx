import React from 'react';
import './account-picker.scss';
import Checkmark from '../../assets/images/shape.svg';
import { Grid, Row, Col } from 'react-bem-grid';
import { translatable } from 'nordnet-i18n';

export class AccountPickerClass extends React.Component {
  render() {
    return (
      <Grid className="account__page">
        <h1 className="customer-registration__page-title">
          { this.props.getIntlMessage('ACCOUNT_PICKER.HEADING_MAIN') }
        </h1>
        <p className="customer-registration__page-description">
          { this.props.getIntlMessage('ACCOUNT_PICKER.PREAMBLE_MAIN') }
        </p>
        <Grid className="account__component">
          <Row className="account">
            <Col xs={ 12 }>
              <Row>
                <Col className="account__type" xs={ 4 } sm={ 3 } md={ 2 } lg= { 2 }>
                  <div className="account__name">
                    <div className="account__name__text">ISK</div>
                  </div>
                </Col>
                <Col className="account__description" xs={ 8 } sm={ 9 } md={ 10 } lg={ 10 }>
                  <Row>
                    <div className="account__description__text">
                      As a new customer an investment savings account will be opened for you.
                    </div>
                    <div className="account__description__text">
                      Once you are logged in, you can easily open more accounts and other account types.
                    </div>
                  </Row>
                  <Row className="account__usp">
                    <Col className="account__usp__ticker">
                      <Row>
                        <img src={ Checkmark } /> <div className="account__usp__text">Our most popular account</div>
                      </Row>
                    </Col>
                    <Col className="account__usp__ticker">
                      <Row>
                        <img src={ Checkmark } /> <div className="account__usp__text">No account fees</div>
                      </Row>
                    </Col>
                    <Col className="account__usp__ticker">
                      <Row>
                        <img src={ Checkmark } /> <div className="account__usp__text">No declaration</div>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </Grid>
    );
  }
}

AccountPickerClass.propTypes = {
  getIntlMessage: React.PropTypes.func,
};

const AccountPicker = translatable(AccountPickerClass);

export {
  AccountPicker as default,
};
