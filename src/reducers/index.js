import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import modal from './modal.reducer.js';
import captainStat from './captain-stat.reducer.js';


export default combineReducers({
  modal: modal,
  routing: routerReducer,
  captainStat,
});
