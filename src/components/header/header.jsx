import React from 'react';
import { Grid, Row, Col } from 'react-bem-grid';
import './header.scss';
import Logo from '../../assets/images/logo.svg';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="customer-registration__header">
          <img className="logo" src={ Logo } />
        </div>
        <Grid>
          <Row>
            <Col xs={ 12 } >
              <h1 className="customer-registration__page-title">
                Become a customer at Nordnet
              </h1>
              <p className="customer-registration__page-description">
                With e-ID, you can open an account directly.
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
