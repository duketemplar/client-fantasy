import { CHANGE_PEP } from '../actions';
import { Pep } from '../models';
import { validate } from '../utils/validators';

function pep(state = new Pep(), action) {
  if (action.type === CHANGE_PEP) {
    return Object.assign(new Pep(), state, action.fieldsToChange);
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
  pep,
  pepValidations,
};
