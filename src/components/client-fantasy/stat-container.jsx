import React from 'react';
import { Col } from 'react-bem-grid';
import classNames from 'classnames';
import './client-fantasy.scss';


export default class StatContainer extends React.Component {
  constructor(props) {
    super(props);
    this.renderCaptainStat = this.renderCaptainStat.bind(this);
    this.renderCaptainItem = this.renderCaptainItem.bind(this);
  }

  renderCaptainItem(week, statData, userId){
    const weekObj = statData[userId][week];
    const classes = classNames({
      'top-captain': weekObj['topscorer'],
    }, 'week-item');

    return (
      <div className= { classes }>{weekObj['captainpoints']}</div>
    );
  }
  renderCaptainStat(userId, statData){
    const weeks = Object.keys(statData[userId]);
    const data = weeks.map(week => this.renderCaptainItem(week, statData, userId));
    return(
      <div> { data } </div>
    );
  }

  render() {
    const {
       statData,
       ...rest,
     } = this.props;

     const userIds = Object.keys(statData);
     const cd = userIds.map(userId => this.renderCaptainStat(userId, statData));

     return(
      <div>
        <Col sm={9} md={9} >
          <p>{ cd }</p>
        </Col>
      </div>
    );
  }
}
