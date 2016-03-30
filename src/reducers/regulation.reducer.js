import { CHANGE_REGULATION } from '../actions';
import { Regulation } from '../models';

function regulation(state = new Regulation(), action) {
  if (action.type === CHANGE_REGULATION) {
    return Object.assign(new Regulation(), state, action.fieldsToChange);
  }
  return state;
}

export default {
  regulation,
};
