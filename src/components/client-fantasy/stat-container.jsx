import React from 'react';
import { Col } from 'react-bem-grid';


export default class StatContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
       statData,
       ...rest,
     } = this.props;

    return(
      <div>
        <Col sm={9} >
          <p>....some status</p>
        </Col>
      </div>
    );
  }
}
