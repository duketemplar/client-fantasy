import { TOGGLE_MODAL } from '../actions';

function showModal(state = false, action) {
  if (action.type === TOGGLE_MODAL) {
    return action.show;
  }

  return state;
}

export default {
  showModal,
}
