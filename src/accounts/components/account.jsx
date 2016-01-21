import React from 'react';
import { FormattedNumber } from 'react-intl';
import { translatable } from 'nordnet-i18n';

export class Account extends React.Component {
  render() {
    const alias = this.props.account.alias;
    const accno = this.props.account.accno;

    return (
      <li>
        <div className='alias'>{ alias }</div>
        <div>{ this.props.getIntlMessage('ACCOUNTS.ACCOUNT_NUMBER') }: { accno }</div>
        <div>
          <FormattedNumber
            value='100'
            minimumFractionDigits='2'
            maximumFractionDigits='4' />
        </div>
      </li>
    );
  }
}

/*
 * Prop type validation
 * You can here see what the component needs.
 * If the component does not get what it needs a warning will be displayed on the console
 * See https://facebook.github.io/react/docs/reusable-components.html
 */
Account.propTypes = {
  getIntlMessage: React.PropTypes.func.isRequired,
  account: React.PropTypes.shape({
    alias: React.PropTypes.string.isRequired,
    accno: React.PropTypes.number.isRequired,
  }).isRequired,
};

export default translatable(Account);
