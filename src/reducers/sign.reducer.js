import { UPDATE_SIGN } from '../actions';

function sign(state = {}, action) {
  switch (action.type) {
    case UPDATE_SIGN:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

export default {
  sign,
};
