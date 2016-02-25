import React from 'react';

import { Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import nordnetAPI from 'nordnet-next-api';

const docs = [
  { name: 'Agreement Banking', url: 'http://pdf-repo.nordnet.se/se/retail/banking.pdf' },
  { name: 'Agreement Trading', url: 'http://pdf-repo.nordnet.se/se/retail/trading.pdf' },
  { name: 'Agreement Your First Born', url: 'http://pdf-repo.nordnet.se/se/retail/first-born.pdf' },
];

export default class SignPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      waitingForSignicat: false,
    };
  }

  postSign() {
    const url = '/api/2/signicat/sign';
    const headers = {};
    const params = { signUrls: docs.map(doc => doc.url) };

    headers.contentType = 'application/json; charset=utf-8';

    nordnetAPI
    .post(url, params, headers)
    .then(({ data }) => {
      if (data.status === 'SIGNED') {
        console.log('Singning completed, id: ', data.signID);
        window.setTimeout(() => {
          window.location = 'https://nordnet.web-konkar.test.nordnet.se/mux/login/startSE.html?cmpi=start-loggain';
        }, 2000);
      } else {
        console.log('Prospect data is not valid! ', data.error);
      }
    })
    .catch(() => {
      throw Error(`Could not post to ${url}`);
    });
  }

  handleSign() {
    this.setState({ waitingForSignicat: true });
    this.postSign();
  }

  renderDocuments() {
    return (
      <div>
        <h3>The following documents needs to be signed to complete the process</h3>
        <ol>
        { docs.map((doc, indx) => {
          return (
            <li key={ indx }>
              <a href={ doc.url }>{ doc.name }</a>
            </li>
            );
        })}
        </ol>
      </div>
    );
  }

  render() {
    const handleSign = this.handleSign.bind(this);
    return (
      <div className="sign-page" style={ { width: '768px' }}>
        <Grid>
          <Row xsCenter>
            <Row>
              <Col xs={12}>
              { this.renderDocuments() }
              </Col>
              <Col xs={12}>
                { this.state.waitingForSignicat ? <div>Signing....</div> : <Button primary onClick={ handleSign }>Sign</Button> }
              </Col>
            </Row>
          </Row>
        </Grid>
      </div>
    );
  }
}
