import React from 'react';
import { Grid, Col, Row } from 'react-bem-grid';
import { Checkbox, Button } from 'nordnet-ui-kit';

class AccountPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    // TODO
  }

  render() {
    return (
      <Grid className="pick-account">
        <Col xs={ 12 }>
          <Row>
            <h1> Pick account type </h1>
          </Row>
          <form onSubmit={ this.handleSubmit.bind(this) }>
            <Row>
              <Col xs={ 1 }>
                <Checkbox className="pick-account__answer--isk" name="isk" label="" />
              </Col>
              <Col xs={ 11 }>
                <h1> Investeringssparkonto </h1>
              </Col>
            </Row>
            <Row xsMiddle>
              <Col xs={ 1 }>
                <Checkbox className="pick-account__answer--kf" name="kf" label="" />
              </Col>
              <Col xs={ 11 }>
                <h1> Kapitalförsäkring </h1>
              </Col>
            </Row>
            <Row xsMiddle>
              <Col xs={ 1 }>
                <Checkbox className="pick-account__answer--af"name="af" label="" />
              </Col>
              <Col xs={ 11 }>
                <h1> Aktie & Fonddepå </h1>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className="compliance__buttons">
                  <Button className="compliance__submit" type="submit" primary >
                    Submit
                  </Button>
                  <Button secondary>
                    Clear values
                  </Button>
                </div>
              </Col>
            </Row>
          </form>
        </Col>
      </Grid>
    );
  }
}

export default AccountPicker;
