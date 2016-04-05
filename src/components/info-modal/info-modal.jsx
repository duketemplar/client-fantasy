import './info-modal.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';

class InfoModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { show, content, onAccept, onCancle } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div>
        <div className="compliance__bkg info-modal__bkg" onClick={ onCancle }></div>
        <div className="compliance__info info-modal__content">
          { content }
        </div>
        <div className="compliance__info--buttons info-modal__action">
          <Button primary onClick={ onAccept }>Continue</Button>
          <Button secondary onClick={ onCancle }>Cancel</Button>
        </div>
      </div>
    );
  }
}

/*
accept() {
window.location = location.origin + MANUAL_FLOW_OPEN_ISK_PATH;
}
<div>
  <div className="compliance__bkg info-modal__bkg" onClick={ closeInfoBox }></div>
  <div className="compliance__info info-modal__content">
    <h1>
      We need to know more about you!
    </h1>
    <p className="compliance__info--text">
      With the grounds that you have answered <b>Yes</b> to one of the questions
      below, we ask that you apply via the extended manual process so that
      we can get some more detailed information about you.
    </p>
    <ul>
      <li className="compliance__list--crs">
        Are you a US citizen, tax or declaration obliged in other countries than Sweden?
      </li>
      <li className="compliance__list--pep">
        Have you, or have you ever had: a high political or government office position
        or are a close family member or an employee of a person in the above position?
      </li>
    </ul>
    <div className="compliance__info--buttons info-modal__action">
      <Button primary onClick={ accept }>Continue</Button>
      <Button secondary onClick={ closeInfoBox }>Cancel</Button>
    </div>
  </div>
</div>
*/

InfoModal.propTypes = {
  show: React.PropTypes.bool.isRequired,
  content: React.PropTypes.element.isRequired,
  onAccept: React.PropTypes.func.isRequired,
  onCancle: React.PropTypes.func.isRequired,
};

export default InfoModal;
