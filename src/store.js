/*
 * File contains initialization of Redux store. Store is initialised with imported reducers and middleware.
 *
 * See http://rackt.github.io/redux/docs/basics/Store.html for more details on Redux stores.
 */

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers';

const MIDDLEWARE = [thunkMiddleware];

// creates Redux store
function finalCreateStore(middleware) {
  const browserDevTool = (
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ?
    window.devToolsExtension() : f => f
  );

  return compose(applyMiddleware(...middleware), browserDevTool)(createStore);
}

console.log("reducers", reducers)

// exports initialised Redux store that is used globally in the application
export default finalCreateStore(MIDDLEWARE)(reducers);
