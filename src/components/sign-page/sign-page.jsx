import React from 'react';

export default class SignPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const handler = this.validate.bind(this);

    return (
      <div className="sign-page">
      </div>
    );
  }
}
