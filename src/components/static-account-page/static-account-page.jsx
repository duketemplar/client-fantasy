import React from 'react';
import './static-account-page.scss';
import { Grid, Row, Col } from 'react-bem-grid';

export default class StaticAccountPage extends React.Component {
  render() {
    return (
      <Grid>
        <h1>Konto</h1>
        <Row className="staticAccountPage">
          <Col xs={ 12 }>
            <div className="account__name">
              <div className="account__name--text">ISK</div>
            </div>
            <Col className="account__description" xs={ 8 }>
              <div className="account__description--text">
                As a new customer an investment savings account will be opened for you.
              </div>
              <div className="account__description--text">
                Once you are logged in, you can easily open more accounts and other account types.
              </div>
            </Col>
            <div className="account__usp">
              <img src="./shape.svg" /> <div className="account__usp--text">Our most popular account</div>
              </div>
              <div className="account__usp">
              <img src="./shape.svg" /> <div className="account__usp--text">No account fees</div>
            </div>
              <div className="account__usp">
              <img src="./shape.svg" /> <div className="account__usp--text">No declaration</div>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
