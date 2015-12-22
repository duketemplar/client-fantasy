import React from 'react';

export default class Modal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="modal">
        <div className="modal--shadow"></div>
        <div className="modal--content">
          { this.props.pane }
        </div>
    </div>
    );
  }
}

Modal.propTypes = { pane: React.PropTypes.element };
