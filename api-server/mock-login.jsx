import React from 'react';
import ReactDOM from 'react-dom';
import cookies from 'cookies-js';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: cookies.get('username') || ''
    };

    this.toggleAuthenticated = this.toggleAuthenticated.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  onUsernameChange(e) {
    this.setState({ username: e.target.value });
  }

  toggleLocale(e) {
    var newLocale = e.target.value;
    cookies.set('locale', newLocale);
    window.location.reload();
  }

  renderLocaleDropdownIfNotLoggedIn() {

    if (this.isAuthenticated()) return;

    return (
      <select value={ cookies.get('locale') } onChange={ this.toggleLocale }>
        <option value="sv-SE">Swedish</option>
        <option value="fi-FI">Finish</option>
      </select>
    );
  }

  render() {
    const style = { padding: '10px' };

    return (
      <nav style={ style }>
        <label htmlFor="username">
          Username
        </label>

        <input
          type="text"
          id="username"
          ref="username"
          value={ this.state.username }
          onChange={ this.onUsernameChange } />

        <button onClick={ this.toggleAuthenticated }>
          { this.isAuthenticated() ? 'Logout' : 'Login' }
        </button>

        { this.renderLocaleDropdownIfNotLoggedIn() }

      </nav>
    );
  }

  toggleAuthenticated() {
    cookies.set('authenticated', !this.isAuthenticated());
    cookies.set('username', this.state.username);
    window.location.reload();
  }

  isAuthenticated() {
    return (cookies.get('authenticated') === 'true'); // stupid comparison because value is a string
  }
}

const container = document.createElement('div');
container.id = 'login-container';
document.body.insertBefore(container, document.body.firstChild);

ReactDOM.render(<Login />, container);
