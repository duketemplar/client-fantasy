/*
 * File contains initialization of Redux store. Store is initialised with imported reducers and middleware.
 *
 * See http://rackt.github.io/redux/docs/basics/Store.html for more details on Redux stores.
 */

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';

// custom reducer for accounts component
// import accountsReducer from './accounts/reducers/accounts';
// import stepsReducer from './modal/reducers/steps';
import prospectReducer from './reducers/prospect.reducer';

const MIDDLEWARE = [thunkMiddleware];

// defines which reducers are responsible for which parts of the state
const REDUCERS = {
  prospect: prospectReducer,
  form: formReducer,
};

// creates Redux store
function finalCreateStore(middleware) {
  const browserDevTool = (
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ?
    window.devToolsExtension() : f => f
  );

  return compose(applyMiddleware(...middleware), browserDevTool)(createStore);
}

// combines Redux reducers using Redux utility function combineReducers
const reducers = combineReducers(REDUCERS);

// exports initialised Redux store that is used globally in the application
export default finalCreateStore(MIDDLEWARE)(reducers);
