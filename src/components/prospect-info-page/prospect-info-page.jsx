import React from 'react';
import { Col, Row, Input, Glyphicon } from 'react-bootstrap';
require('bootstrap/dist/css/bootstrap.css');
import '../create-customer.sass';
import { connect } from 'react-redux';
import store from '../../store';
import { civicRegistrationNumberValidator } from '../../helpers/validators/index.js'


const phoneGlyph = <Glyphicon glyph="earphone" />;

class ProspectInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      civicRegistrationNumber: ''
    };
  }

  formChanged() {
    this.setState(
      {
        civicRegistrationNumber: this.refs.civicRegistrationNumber.getValue()
      }
    );
  }

  render() {
    return (
      <div className="create-customer">

        <Col xs={12}>
          <Row>
            <h1>Becoming a customer - Contact Info</h1>
          </Row>

          <form onSubmit={ this.submitForm.bind(this) }>
            <Col xs={4}>
                <Input name="firstName" type="text" ref="firstName" label="First Name" placeholder="Anna" />
                <Input name="lastName" type="text" ref="lastName" label="Last Name" placeholder="Andersson" />

                <Input  name="civicRegistrationNumber" type="text" 
                        ref="civicRegistrationNumber" label="Civic Registration Number"
                        value={ this.state.civicRegistrationNumber }
                        bsStyle={ civicRegistrationNumberValidator(this.state.civicRegistrationNumber) }
                        onChange={ this.formChanged.bind(this) }
                        placeholder="19890101-1234" />
                
                <Input name="citizenship" type="select" label="Citizenship" placeholder="Sverige">
                  <option value="se">Sverige</option>
                  <option value="dk">Danmark</option>
                </Input>

                <Input name="careof" type="text" ref="careof" label="c/o" placeholder="Anders Andersson" />
                <Input name="address" type="text" ref="address" label="Address" placeholder="Stora Gatan 123" />
                <Input name="zip" type="text" ref="zip" label="Zip code" placeholder="123 23" />
                <Input name="city" type="text" ref="city" label="City" placeholder="Stockholm" />

                <Input name="land" type="select" label="Country" placeholder="Sverige" >
                  <option value="se">Sverige</option>
                  <option value="dk">Danmark</option>
                </Input>

                <Input name="email" type="text" label="E-mail" placeholder="anna.svensson@email.com" addonBefore="@" />
                <Input name="phone" type="text" label="Phone" placeholder="+46 (0) 70 123 45 67" addonBefore={ phoneGlyph } />
                <Input name="submit" type="submit" />
            </Col>
          </form>
        </Col>
      </div>
    );
  }

  submitForm(e) {
    e.preventDefault();

    const action = {
      step: 'POST_PROSPECT_INFO',
      value: {
        firstName: this.refs.firstName.getValue(),
        lastName: this.refs.lastName.getValue(),
        civicRegistrationNumber: this.refs.civicRegistrationNumber.getValue(),
      },
    };

    store.dispatch(action);
    this.props.history.pushState(null, '/register/compliance');
  }

  close() {
    this.setState({ showModal: false });
  }

  enableNextStep(cb) {
    const data = cb();

    if (data.valid) {
      this.setState({ validForNextStep: true });
    }
  }

  previous() {
    const previousStep = this.state.paneIndex > 0 ? --this.state.paneIndex : this.state.paneIndex;
    this.setState({ paneIndex: previousStep });
  }

  next() {
    const nextStep = this.state.paneIndex < this.panes.length - 1 ? ++this.state.paneIndex : this.state.paneIndex;
    this.setState({ paneIndex: nextStep });
  }
}

function reducerState(state) {
  return {
    step: state.steps,
    value: state.value,
  };
}

export default connect(reducerState)(ProspectInfoPage);
