import './info-page.scss';
import React from 'react';
import { Button } from 'nordnet-ui-kit';

export default class InfoPage extends React.Component {
  accept() {
    console.log('accept');
  }

  decline() {
    console.log('decline');
  }

  render() {
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
            <Button secondary onClick={ this.decline }>Tillbaka</Button>
          </div>
        </div>
      </div>
    );
  }
}
