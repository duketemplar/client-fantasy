/*
 * File contains root application component (App). App component is wrapped in i18n component from norndet-i18n package
 * to make localization functions available to all of the children components via React Context.
 *
 * File exports a function that should be triggered once locale is resolved and localization data is loaded.
 *
 * See https://medium.com/@skwee357/the-land-of-undocumented-react-js-the-context-99b3f931ff73 on more information regarding React Context.
 */

import React from 'react';
import ReactDOM from 'react-dom';

// imports Redux Provider, see https://github.com/rackt/react-redux#provider-store
import { Provider } from 'react-redux';

// i18n function for adding localization support in react components
import { i18n } from 'nordnet-i18n';

import IdentifyPage from './components/identify-page';
import ProspectInfoPage from './components/prospect-info-page';
import CompliancePage from './components/compliance-page';
import PepPage from './components/pep-page';
import AccountPicker from './components/account-picker';
import SignPage from './components/sign-page';

// Redux store
import store from './store';
import { Router, Route, hashHistory } from 'react-router';

// Root application component
class App extends React.Component {

  render() {
    return (
      <Router history={ hashHistory }>
        <Route name="prospect-info-page" path="/"                      component={ IdentifyPage }     key="identify-page" />
        <Route name="identify-page"      path="/identify"              component={ IdentifyPage }     key="identify-page" />
        <Route name="prospect-info-page" path="/register/contact-info" component={ ProspectInfoPage } key="prospect-info-page" />
        <Route name="compliance"         path="/register/compliance"   component={ CompliancePage }   key="compliance-page" />
        <Route name="pep"                path="/register/pep"          component={ PepPage }          key="pep-page" />
        <Route name="account-picker"     path="/register/pick-account" component={ AccountPicker }    key="account-picker" />
        <Route name="sign"               path="/register/sign"         component={ SignPage }         key="sign-page" />
      </Router>
    );
  }
}

// Make i18n functions available to all children via React Context
const AppWithI18N = i18n(App);

/*
 * Exports function that is be executed when locale is resolved and localization data is available.
 * Renders application by calling React.render()
 */
export default function (element, intlData) {
  // Calls React.render and renders application within provided element
  // AppWithI18N is wraped in Redux <Provider /> to be able to connect React components to the Redux store.
  // See https://github.com/rackt/react-redux#provider-store
  const rootInstance = ReactDOM.render(
    <div>
      <Provider store={ store }>
        <AppWithI18N { ...intlData } />
      </Provider>
    </div>,
    element
  );

  // https://github.com/gaearon/react-hot-loader/blob/master/docs/README.md#usage-with-external-react
  if (module.hot) {
    require('react-hot-loader/Injection').RootInstanceProvider.injectProvider({
      // Help React Hot Loader figure out the root component instances on the page:
      getRootInstances: () => [rootInstance],
    });
  }
}
