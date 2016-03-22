import { CHANGE_REGULATION, CHANGE_PEP, CHANGE_KYC } from '../actions';
import { Pep, Kyc, Regulation } from '../models';
import { validate } from '../utils/validators';

function regulation(state = new Regulation(), action) {
  if (action.type === CHANGE_REGULATION) {
    return Object.assign(new Regulation(), state, action.fieldsToChange);
  }

  return state;
}

function pep(state = new Pep(), action) {
  if (action.type === CHANGE_PEP) {
    return Object.assign(new Pep(), state, action.fieldsToChange);
  }

  return state;
}

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

function pepValidations(state = {}, action) {
  if (action.type === CHANGE_PEP) {
    return Object.assign({}, state, validate(action.fieldsToChange, Pep.validators));
  }

  return state;
}

export default {
  regulation,
  pep,
  kyc,
  pepValidations,
  kycValidations,
};
