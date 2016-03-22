/* jscs:disable maximumLineLength */
import './pep-page.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import InfoModal from '../../components/info-modal';
import { changePep, toggleModal } from '../../actions';

class PepPage extends React.Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateRegulation() {

  }

  handleChange(e) {
    this.props.dispatch(changePep({
      isPep: e.target.value !== 'no',
    }));
  }

  submitForm() {
    const pep = this.props.pep;

    if (pep.isPep) {
      this.props.dispatch(toggleModal(true));
    } else {
      this.updateRegulation();
    }
  }

  isPep() {
    return this.props.pep.isPep;
  }

  render() {
    return (
      <Grid className="pep">
        <Row>
          <Col xs={ 12 }>
            <h1>
              Politically Exposed Person
            </h1>
          </Col>
        </Row>
        <Row>
          <form onSubmit={ this.submitForm }>
            <Row>
              <Col xs={ 12 }>
                <h2>
                  Have you, or have you ever had: a high political or government office position
                  or are a close family member or an employee of a person in the above position?
                </h2>
                <p>
                  For further information, please see the form <a href="https://www.nordnet.se/pdf/se/pep.pdf">here</a>.
                </p>
              </Col>
            </Row>
            <Row>
              <Col xs={ 1 }>
                <label>No&nbsp;&nbsp;</label>
                <input type="radio"
                  name="pep" value="no" label="no"
                  checked={ this.props.pep.isPep !== undefined && !this.isPep() }
                  className="compliance__pep--no"
                  onChange={ this.handleChange }
                />
              </Col>
              <Col xs={ 1 } xsOffset={ 0 }>
                <label>Yes&nbsp;&nbsp;</label>
                <input type="radio"
                  name="pep" value="yes" label="yes"
                  checked={ this.isPep() }
                  className="compliance__pep--yes"
                  onChange={ this.handleChange }
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <div className="compliance__pep--button">
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
        </Row>
        <InfoModal />
      </Grid>
    );
  }
}

PepPage.propTypes = {
  dispatch: React.PropTypes.func,
  pep: React.PropTypes.object,
};

PepPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    pep: state.pep,
  };
}

export default connect(select)(PepPage);
