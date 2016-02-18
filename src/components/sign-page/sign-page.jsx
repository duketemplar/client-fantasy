import React from 'react';

import { Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';

const docs = [
  { name: 'Agreement Banking', url: 'waiiit-for-it' },
  { name: 'Agreement Trading', url: 'waiiit-for-it' },
  { name: 'Agreement Your First Born.', url: 'waiiit-for-it' },
];

export default class SignPage extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSign() {
    console.log('Will now need to sign something....');
  }

  renderDocuments() {
    return (
      <ul>
      { docs.map((doc, indx) => {
        return (
          <li key={ indx }>
            <a href={ doc.url }>{ doc.name }</a>
          </li>
        );
      })}
      </ul>
    );
  }

  render() {
    const handleSign = this.handleSign.bind(this);
    return (
      <div className="sign-page" style={ { width: '768px' }}>
        <Grid>
          <Row>
            <Col xs={12}>
              <h2>The following documents needs to be signed to complete the process</h2>
              { this.renderDocuments() }
            </Col>
            <Col xs={12} xsOffset={11}>
              <Button primary onClick={ handleSign }>Sign</Button>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
