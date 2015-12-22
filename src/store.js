/*
 * File contains initialization of Redux store. Store is initialised with imported reducers and middleware.
 *
 * See http://rackt.github.io/redux/docs/basics/Store.html for more details on Redux stores.
 */

import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// custom reducer for accounts component
// REPLACE with list of your own reducers
import accountsReducer from './accounts/reducers/accounts';
import stepsReducer from './modal/reducers/steps';

const MIDDLEWARE = [thunkMiddleware];

// defines which reducers are responsible for which parts of the state
// REPLACE with list of your own reducers
const REDUCERS = {
  accounts: accountsReducer,
  steps: stepsReducer,
};

// creates Redux store
function finalCreateStore(middleware) {
  if (DEBUG) {
    const devtools = require('./devtools');
    return devtools.createStoreWithDevTools(applyMiddleware(...middleware));
  }

  return applyMiddleware(...middleware)(createStore);
}

// combines Redux reducers using Redux utility function combineReducers
const reducers = combineReducers(REDUCERS);

// exports initialised Redux store that is used globally in the application
export default finalCreateStore(MIDDLEWARE)(reducers);
