import React from 'react';
import { Col, Row, Input } from 'react-bootstrap';

export default class CompliancePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="create-customer">

        <Col xs={12}>
          <Row>
            <h1>Becoming a customer - Regulation Info</h1>
          </Row>

          <form onSubmit={ this.submitForm.bind(this) }>
            <Col xs={4}>
              <Row>
                <Input name="taxCountry" type="text" label="Tax Country" placeholder="Papau New Guinea" />
                <Input name="tin" type="text" label="Tax Identification Number" placeholder="234.23.000-WARREN-G" />
                <Input name="submit" type="submit" />
              </Row>
            </Col>
          </form>
        </Col>
      </div>
    );
  }

  submitForm() {}
}
