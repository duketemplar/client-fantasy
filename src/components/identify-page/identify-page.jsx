import './identify-page.scss';

import React from 'react';
import { Input, Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';

class IdentifyPage extends React.Component {
  handleSubmit() {
    this.context.router.push({
      pathname: '/register/contact-info',
    });
  }

  render() {
    return (
      <Grid className="identify-page">
        <Row xsMiddle xsCenter>
          <Col xs={ 6 }>
            <form onSubmit={ this.handleSubmit.bind(this) } >
              <Input type="text" label="National registration number" />
              <Button type="submit">
                Submit
              </Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

IdentifyPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default IdentifyPage;
