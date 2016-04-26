import React from 'react';
import './account-picker.scss';
import Checkmark from '../../assets/images/shape.svg';
import { Grid, Row, Col } from 'react-bem-grid';
import { translatable } from 'nordnet-i18n';

class AccountPicker extends React.Component {
  render() {
    return (
      <Grid className="account-picker">
        <Row className="account-picker__header">
          <Col xs={ 12 }>
            <h3>
              { this.props.getIntlMessage('ACCOUNT_PICKER.HEADING_MAIN') }
            </h3>
          </Col>
        </Row>
        <Row className="account-picker__body" xsMiddle>
          <Col xs={ 4 }>
            <div className="account-logo">ISK</div>
          </Col>
          <Col xs={ 8 } className="account-usp">
            <div className="account-usp__header">
              As a new customer an investment savings account will be opened for you.
              Once you are logged in, you can easily open more accounts and other account types.
            </div>
            <div className="account-usp__body">
              <span className="account-usp__item">
                <img src={ Checkmark } />Our most popular account
              </span>
              <span className="account-usp__item">
                <img src={ Checkmark } />No account fees
              </span>
              <span className="account-usp__item">
                <img src={ Checkmark } />No declaration
              </span>
              </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

AccountPicker.propTypes = {
  getIntlMessage: React.PropTypes.func,
};

export default translatable(AccountPicker);
