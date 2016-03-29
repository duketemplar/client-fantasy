import { combineReducers } from 'redux';
import prospect from './prospect.reducer.js';
import modal from './modal.reducer.js';
import regulation from './regulation.reducer.js';
import kyc from './kyc.reducer.js';
import pep from './pep.reducer.js';
import taxInfo from './tax-info.reducer.js';

export default combineReducers({
  ...prospect,
  ...modal,
  ...regulation,
  ...kyc,
  ...pep,
  ...taxInfo,
});
