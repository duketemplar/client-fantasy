import './info-page.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';
import { MANUAL_FLOW_OPEN_ISK_PATH } from '../../utils/endpoints';

export default class InfoPage extends React.Component {
  accept() {
    window.location = location.origin + MANUAL_FLOW_OPEN_ISK_PATH;
  }

  decline() {
    this.props.didClose();
  }

  render() {
    const f = () => { this.decline(); };
    return (
      <div>
        <div className="compliance__bkg"></div>
        <div className="compliance__info">
          <h1>
            Vi behöver veta lite mer om dig!
          </h1>
          <p className="compliance__info--text">
            Med grund av att du har svarat <b>Ja</b> till en av nedanstående frågor
            så ber vi att du ansöker via den utökade manuella processen så att vi
            kan få lite mer detaljerad information om dig.
          </p>
          <ul>
            <li className="compliance__list--crs">
              Är du amerikansk medborgare, skatt- eller deklarationsskyldig i annat land än Sverige?
            </li>
            <li className="compliance__list--pep">
              Har du, eller har du tidigare haft: en hög politisk statlig befattning eller
              är nära familjemedlem eller medarbetare med en person i ovanstående befattning?
            </li>
          </ul>
          <div className="compliance__info--buttons">
            <Button primary onClick={ this.accept }>Fortsätt</Button>
            <Button secondary onClick={ f }>Tillbaka</Button>
          </div>
        </div>
      </div>
    );
  }
}

InfoPage.propTypes = {
  didClose: React.PropTypes.func.isRequired,
};
