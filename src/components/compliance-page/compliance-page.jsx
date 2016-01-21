import React from 'react';

export default class CompliancePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const handler = this.validate.bind(this);

    return (
      <div className="compliance-page">
      </div>
    );
  }
}
