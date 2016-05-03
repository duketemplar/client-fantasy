/* jscs:disable maximumLineLength */
/* eslint-disable max-len */
import './client-fantasy.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';
import { Col, Row } from 'react-bem-grid';
import StatContainer from './stat-container';

class ClientFantasy extends React.Component {
  constructor(props) {
    super(props);

    this.filterCaptainPoints = this.filterCaptainPoints.bind(this);
  }

  filterCaptainPoints() {
    this.props.getCaptainStat();
  }

  render() {
    const {
      captainStat,
    } = this.props;

    return (
        <Row className='status-section'>
          <Col sm={2} md={2} >
            <p>Captain points</p>
          </Col>
          <Col sm={1} md={1} >
            <Button onClick={this.filterCaptainPoints} className="status-section__button" primary type="text" disabled={false}>
              Submit
            </Button>
          </Col>

          <StatContainer
            statData={captainStat}
          />
        </Row>
    );
  }
}

ClientFantasy.propTypes = {
  getIntlMessage: React.PropTypes.func,
  getCaptainStat: React.PropTypes.func,
  captainStat: React.PropTypes.func,
};
ClientFantasy.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default ClientFantasy;
