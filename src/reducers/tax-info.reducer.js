import { TaxInfo } from '../models';
import { CHANGE_TAX_INFO } from '../actions';
import { validate } from '../utils/validators';

function taxInfo(state = new TaxInfo(), action) {
  if (action.type === CHANGE_TAX_INFO) {
    return new TaxInfo(Object.assign({}, state, action.fieldsToChange));
  }

  return state;
}

function taxInfoValidations(state = {}, action) {
  if (action.type === CHANGE_TAX_INFO) {
    return Object.assign({}, state, validate(action.fieldsToChange, TaxInfo.validators));
  }

  return state;
}

export default {
  taxInfo,
  taxInfoValidations,
};
