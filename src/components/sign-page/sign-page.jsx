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

    const _this = this;
    nordnetAPI
    .post(url, params, headers)
    .then(({ data }) => {
      if (data.status === 'SIGNED') {
        console.log('Singning completed, id: ', data.signID); // eslint-disable-line no-console
        _this.context.router.push('/');
      } else {
        console.log('Prospect data is not valid! ', data.error); // eslint-disable-line no-console
      }
    })
    .catch((error) => {
      throw Error(`Could not post to ${url}: ${error.message}`);
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
    const signButtonProps = {};
    if (this.state.waitingForSignicat) {
      Object.assign(signButtonProps, { secondary: true, disabled: true, type: 'success' });
    } else {
      Object.assign(signButtonProps, { primary: true });
    }

    return (
      <div className="sign-page" style={ { width: '768px' }}>
        <Grid>
          <Row xsCenter>
            <Row>
              <Col xs={12}>
              { this.renderDocuments() }
              </Col>
              <Col xs={12}>
                <Button onClick={ handleSign } { ...signButtonProps }>Sign</Button>
              </Col>
            </Row>
          </Row>
        </Grid>
      </div>
    );
  }
}

SignPage.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
