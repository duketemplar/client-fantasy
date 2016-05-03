import React from 'react';
import { Grid, Row, Col } from 'react-bem-grid';
import './header.scss';
import Logo from '../../assets/images/logo.svg';
import { translatable } from 'nordnet-i18n';

class Header extends React.Component {
  render() {
    return (
      <div>
        <div className="customer-registration__header">
          <img className="logo" src={ Logo } />
        </div>
        <Grid>
          <Row>
            <Col xs={ 12 } >
              <h1>
                { this.props.getIntlMessage('PROSPECT_INFO.HEADING_MAIN') }
              </h1>
              <h3>
                { this.props.getIntlMessage('PROSPECT_INFO.PREAMBLE_MAIN') }
              </h3>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


Header.propTypes = {
  getIntlMessage: React.PropTypes.func,
};

export default translatable(Header);
