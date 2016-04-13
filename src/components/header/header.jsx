import React from 'react';
import { Grid, Row, Col } from 'react-bem-grid';
import './header.scss';
import Logo from '../../assets/images/logo.svg';
import { translatable } from 'nordnet-i18n';

export class HeaderClass extends React.Component {
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
                { this.props.getIntlMessage('PROSPECT_INFO.HEADING_MAIN') }
              </h1>
              <p className="customer-registration__page-description">
                { this.props.getIntlMessage('PROSPECT_INFO.PREAMBLE_MAIN') }
              </p>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}


HeaderClass.propTypes = {
  getIntlMessage: React.PropTypes.func,
};

const Header = translatable(HeaderClass);

export {
  Header as default,
};
