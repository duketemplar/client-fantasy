import React from 'react';
import { connect } from 'react-redux';

class Modal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.steps.pane === null) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modal--shadow"></div>
        <div className="modal--content">
          { this.props.steps.pane }
        </div>
    </div>
    );
  }
}

Modal.propTypes = { steps: React.PropTypes.object };

function select(state) {
  return {
    steps: state.steps,
  };
}

export default connect(select)(Modal);
