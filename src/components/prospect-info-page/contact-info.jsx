import React from 'react';
import { Input } from 'react-bootstrap';
import '../create-customer.sass';

export default class ContactInfo extends React.Component {
  constructor(props) {
    super(props);

    this.data = { valid: false };
    this.validator = {
      personalId: {
        regEx: /.+/,
        valid: false,
      },
      firstName: {
        regEx: /.+/,
        valid: false,
      },
      lastName: {
        regEx: /.+/,
        valid: false,
      },
    };
  }

  render() {
    const handler = this.validate.bind(this);

    return (
      <div className="contact-info">
        <form>
          <Input name="personalId" type="text" label="Personal Identity Number" placeholder="YYYY-MM-DD-XXXX" onChange={ handler } />
          <Input name="firstName" type="text" label="First Name" placeholder="Kalle" onChange={ handler } />
          <Input name="lastname" type="text" label="Last Name" placeholder="Stropp" onChange={ handler } />

          <Input name="crsAnswer" type="radio" label="CRS Yes" value="yes" defaultChecked onChange={ handler } />
          <Input name="crsAnswer" type="radio" label="CRS No" value="no" onChange={ handler } />
        </form>
      </div>
    );
  }

  validate(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.data[name] = value;

    for (const validate in this.validator) {
      if (name === validate && value.match(validate.regEx)) {
        console.log('implement this');
      }
    }

    event.target.bsStyle = 'error';
    this.data.valid = true;

    this.props.dataUpdatedCb(() => this.data);
  }
}

ContactInfo.propTypes = { dataUpdatedCb: React.PropTypes.func };
