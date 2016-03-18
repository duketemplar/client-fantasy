const TOGGLE_MODAL = "TOGGLE_MODAL";

function toggleModal(show) {
  return {
    type: TOGGLE_MODAL,
    show,
  };
}

export default {
  toggleModal,
  TOGGLE_MODAL,
}
