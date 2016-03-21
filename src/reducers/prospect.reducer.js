import { RECEIVED_PROSPECT, CHANGE_PROSPECT, RECEIVED_REGULATION } from '../actions';
import { validate } from '../utils/validators';
import { Prospect } from '../models';

function prospect(state = new Prospect(), action) {
  switch (action.type) {
    case RECEIVED_PROSPECT:
      return Object.assign(new Prospect(), state, action.prospect);
    case CHANGE_PROSPECT:
      return Object.assign(new Prospect(), state, action.fieldsToChange);
    case RECEIVED_REGULATION:
      return Object.assign(new Prospect(), state, { regulation_id: action.regulation.id });
    default:
      return state;
  }
}

function prospectValidations(state = {}, action) {
  if (action.type !== CHANGE_PROSPECT) {
    return state;
  }

  return Object.assign({}, state, validate(action.fieldsToChange, Prospect.validators));
}

export default {
  prospect,
  prospectValidations,
};
