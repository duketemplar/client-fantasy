const CHANGE_REGULATION = "CHANGE_REGULATION";

function changeRegulation(fieldsToChange) {
  return {
    type: CHANGE_REGULATION,
    fieldsToChange,
  };
}

export default {
  changeRegulation,
  CHANGE_REGULATION,
}
