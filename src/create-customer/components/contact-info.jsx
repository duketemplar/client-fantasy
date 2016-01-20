import React from 'react';
import {Input} from 'react-bootstrap';
import '../create-customer.sass';

export default class ContactInfo extends React.Component {
  constructor(props) {
    super(props);

    this.data = {};
    this.state = {
      personalId: '',
      firstName: '',
      lastName: '',
      crsAnswer: '',
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
    this.data[event.target.name] = event.target.value;

    this.props.handler(() => this.data);
  }
}

ContactInfo.propTypes = { handler: React.PropTypes.func };
