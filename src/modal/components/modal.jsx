import React from 'react';
import { connect } from 'react-redux';

class Modal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log('Updating modal');
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

Modal.propTypes = { pane: React.PropTypes.element };

function selectedActions(state) {
  return {
    steps: state.steps,
  };
}

export default connect(selectedActions)(Modal);
