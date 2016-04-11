import './info-modal.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';

class InfoModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, content, onAccept, onCancel } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className="info-modal">
        <div className="info-modal__background" onClick={ onCancel }></div>
        <div className="info-modal__container">
          <div className="info-modal__content">
            { content }
          </div>
          <div className="info-modal__action">
            <Button className="info-modal__continue" primary onClick={ onAccept }>Continue</Button>
            <Button className="info-modal__cancel" secondary onClick={ onCancel }>Cancel</Button>
          </div>
        </div>
      </div>
    );
  }
}

InfoModal.propTypes = {
  show: React.PropTypes.bool.isRequired,
  content: React.PropTypes.element.isRequired,
  onAccept: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
};

export default InfoModal;
