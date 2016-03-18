/* jscs:disable maximumLineLength */
import './pep-page.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';
import { Grid, Col, Row } from 'react-bem-grid';
import { connect } from 'react-redux';
import InfoModal from '../../components/info-modal';
import { changeRegulation, toggleModal } from '../../actions';

// export const fields = {
//   pep: [
//     [notBlankValidator, 'This question needs to be answered.'],
//     [regexValidator, /^(yes|no)$/, 'The answer provided is not a valid choice.'],
//   ],
// };

// const validate = combineValidators(fields);

class PepPage extends React.Component {
  constructor(props) {
    super(props);
  }

  updateRegulation() {
    
  }

  handleChange(e) {
    this.props.dispatch(changeRegulation({
      pep: {
        is_pep: e.target.value !== 'no',
      }
    }));
  }

  submitForm() {
    const regulation = this.props.regulation;

    if (regulation.pep === undefined) {
      return;
    }
    
    regulation.pep.is_pep ? this.props.dispatch(toggleModal(true)) : this.updateRegulation();
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
          <form onSubmit={ this.submitForm.bind(this) }>
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
                  checked={ this.props.regulation.pep && !this.props.regulation.pep.is_pep }
                  className="compliance__pep--no"
                  onChange={ this.handleChange.bind(this) }
                />
              </Col>
              <Col xs={ 1 } xsOffset={ 0 }>
                <label>Yes&nbsp;&nbsp;</label>
                <input type="radio"
                  name="pep" value="yes" label="yes"
                  checked={ this.props.regulation.pep && this.props.regulation.pep.is_pep }
                  className="compliance__pep--yes"
                  onChange={ this.handleChange.bind(this) }
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
};

PepPage.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    regulation: state.regulation,
  };
}

export default connect(select)(PepPage);
