import './info-modal.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';
import { MANUAL_FLOW_OPEN_ISK_PATH } from '../../utils/endpoints';

export default class InfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: props.showInfo,
    };
  }

  componentWillReceiveProps({ showInfo }) {
    this.setState({
      showInfo,
    });
  }

  accept() {
    window.location = location.origin + MANUAL_FLOW_OPEN_ISK_PATH;
  }

  toggleInfoBox(show) {
    this.setState({ showInfo: show });
  }

  render() {
    if (!this.state.showInfo) {
      return null;
    }
    const closeInfoBox = this.toggleInfoBox.bind(this, false);

    return (
      <div>
        <div className="compliance__bkg" onClick={ closeInfoBox }></div>
        <div className="compliance__info">
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
          <div className="compliance__info--buttons">
            <Button primary onClick={ this.accept }>Continue</Button>
            <Button secondary onClick={ closeInfoBox }>Cancel</Button>
          </div>
        </div>
      </div>
    );
  }
}

InfoModal.propTypes = {
  showInfo: React.PropTypes.bool.isRequired,
};
