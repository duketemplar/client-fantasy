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
    console.log('w', weekObj);

    const classes = classNames({
      'top-captain': weekObj['topscorer'],
    }, 'week-item');

    return (
      <div className= { classes }>{weekObj['captainpoints']}</div>
    );
  }

  /*

  const mainApplicantCustomerInfo = customerInfoRenderTemplate.map(
    input => <Layout inputData = { input } {...this.props} />
  );*/

  renderCaptainStat(userId, statData){
    const weeks = Object.keys(statData[userId]);
    console.log('renderCaptainStat', weeks);
    const data = weeks.map(week => this.renderCaptainItem(week, statData, userId));
    return(
      <div> { data } </div>
    );
    // const captainData = userIds.map(
    //   userId => <Captain userId = { userId } statData = { statData } {...this.props} />
    // );

    // let captainData = 0;
    // Object.keys(statData).forEach(function(userId, index) {
    //   console.log('loop 1: ', userId);
    //   Object.values(statData[userId]).forEach(function(data, index) {
    //     captainData = userIds.map(
    //       userId => <Captain userId = { userId } statData = { statData } data = {data} {...this.props} />
    //     );
    //   });
    // });
    // return (
    //   captainData
    // );
  }



  render() {
    const {
       statData,
       ...rest,
     } = this.props;

     const userIds = Object.keys(statData);
     const cd = userIds.map(userId => this.renderCaptainStat(userId, statData));
     console.log('cd', cd);


    return(
      <div>
        <Col sm={9} md={9} >
          <p>{ cd }</p>
        </Col>
      </div>
    );
  }
}
