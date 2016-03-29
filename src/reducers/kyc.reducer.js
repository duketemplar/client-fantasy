import { CHANGE_KYC } from '../actions';
import { Kyc } from '../models';
import { validate } from '../utils/validators';

function kyc(state = new Kyc(), action) {
  if (action.type === CHANGE_KYC) {
    return Object.assign(new Kyc(), state, action.fieldsToChange);
  }

  return state;
}

function kycValidations(state = {}, action) {
  if (action.type === CHANGE_KYC) {
    return Object.assign({}, state, validate(action.fieldsToChange, Kyc.validators));
  }

  return state;
}

export default {
  kyc,
  kycValidations,
};
