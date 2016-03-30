import React from 'react';

import { Button, Checkbox } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import nordnetAPI from 'nordnet-next-api';

export default class SignPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      waitingForSignicat: false,
      termsAndConditionAccepted: false,
    };
  }

  getContitionText() {
    return (
      <span>
        Many cryptographers would agree that, had it not been for the transistor, the refinement of Lamport clocks that would allow for further study into 32 bit architectures might never have occurred.
        In fact, few theorists would disagree with the exploration of web browsers. Continuing with this rationale, to put this in perspective, consider the fact that acclaimed statisticians regularly
        use I/O automata to answer this quagmire. Unfortunately, Lamport clocks alone is not able to fulfill the need for decentralized configurations. We introduce an analysis of DNS, which we call ChoroidCOD.
        The usual methods for the exploration of evolutionary programming do not apply in this area. We emphasize that ChoroidCOD can be synthesized to prevent the refinement of Scheme. Thus, we describe new
        interactive communication (ChoroidCOD), disconfirming that Moore's Law can be made interposable, distributed, and ambimorphic. Motivated by these observations, lossless symmetries and write-back
        caches have been extensively developed by hackers worldwide. We emphasize that our heuristic turns the interposable configurations sledgehammer into a scalpel. In the opinions of many, the basic
        tenet of this solution is the construction of digital-to-analog converters. Our methodology can be improved to learn consistent hashing. Nevertheless, the transistor might not be the panacea that
        analysts expected. This work presents two advances above prior work. Primarily, we consider how link-level acknowledgements [28] can be applied to the construction of multi-processors. On a similar
        note, we disprove that context-free grammar can be made empathic, permutable, and encrypted [2,3,39,28]. The rest of this paper is organized as follows. For starters, we motivate the need for symmetric
        encryption. Continuing with this rationale, we place our work in context with the prior work in this area. Furthermore, to overcome this issue, we describe a methodology for neural networks (ChoroidCOD),
        which we use to prove that suffix trees and architecture can agree to accomplish this goal. Finally, we conclude.
      </span>
    );
  }

  postSign() {
    const url = '/api/2/signicat/sign';
    const headers = {};
    const params = { signUrls: 'https://nordnet-agreements.pdf.nordnet.se/customer/retail' };

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

  handleCancle() {
    this.context.router.push('/');
  }

  handleAcceptTermsAndConditions(event) {
    this.setState({ termsAndConditionAccepted: event.target.checked });
  }

  render() {
    const handleSign = this.handleSign.bind(this);
    const handleCancle = this.handleCancle.bind(this);
    const handleAcceptTermsAndConditions = this.handleAcceptTermsAndConditions.bind(this);

    const signButtonProps = {};
    if (this.state.waitingForSignicat) {
      Object.assign(signButtonProps, { secondary: true, disabled: true, type: 'success' });
    } else {
      Object.assign(signButtonProps, { primary: true, disabled: !this.state.termsAndConditionAccepted });
    }

    return (
      <Grid>
        <Row xsCenter>
          <Col xs={ 12 }>
            <h1>-- Terms & Conditions -- </h1>
            <p>
              { this.getContitionText() }
            </p>
            <Checkbox label="I have read and accepted the terms and conditions above." onClick={ handleAcceptTermsAndConditions } />
          </Col>
        </Row>
        <Row xsEnd>
          <Button secondary onClick={ handleCancle } >Cancel</Button>
          <Button onClick={ handleSign } { ...signButtonProps }>Sign</Button>
        </Row>
      </Grid>
    );
  }
}

// TODO: Remove router from context or else stub it in tests
SignPage.contextTypes = {
  router: React.PropTypes.func.isRequired,
};
