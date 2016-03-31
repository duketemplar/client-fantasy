import React from 'react';
import './account-picker.scss';
import { Grid, Row, Col } from 'react-bem-grid';

export default class AccountPicker extends React.Component {
  render() {
    return (
      <Grid>
        <h1>Konto</h1>
        <Row className="account">
          <Col xs={ 12 }>
            <div className="account__name">
              <div className="account__name__text">ISK</div>
            </div>
            <Col className="account__description" xs={ 8 }>
              <div className="account__description__text">
                As a new customer an investment savings account will be opened for you.
              </div>
              <div className="account__description__text">
                Once you are logged in, you can easily open more accounts and other account types.
              </div>
            </Col>
            <div className="account__usp">
              <img src="../assets/images/shape.svg" /> <div className="account__usp__text">Our most popular account</div>
              </div>
              <div className="account__usp">
              <img src="../assets/images/shape.svg" /> <div className="account__usp__text">No account fees</div>
            </div>
              <div className="account__usp">
              <img src="../assets/images/shape.svg" /> <div className="account__usp__text">No declaration</div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
