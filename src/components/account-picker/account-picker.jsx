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
                <Row className="account__usp__row">
                  <Col className="account__usp">
                    <Row>
                      <img src="../assets/images/shape.svg" /> <div className="account__usp__text">Our most popular account</div>
                    </Row>
                  </Col>
                  <Col className="account__usp">
                    <Row>
                      <img src="../assets/images/shape.svg" /> <div className="account__usp__text">No account fees</div>
                    </Row>
                  </Col>
                  <Col className="account__usp">
                    <Row>
                      <img src="../assets/images/shape.svg" /> <div className="account__usp__text">No declaration</div>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
