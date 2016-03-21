import { combineReducers } from 'redux';
import prospect from './prospect.reducer.js';
import prefill from './prefill.reducer.js';
import modal from './modal.reducer.js';
import regulation from './regulation.reducer.js';

export default combineReducers({
  ...prospect,
  ...prefill,
  ...modal,
  ...regulation,
});
