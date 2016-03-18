import { CHANGE_REGULATION } from '../actions'

function regulation(state = {}, action) {
  if (action.type == CHANGE_REGULATION) {
    return Object.assign({}, state, action.fieldsToChange);
  }
  return state;
}

export default {
  regulation,
}
