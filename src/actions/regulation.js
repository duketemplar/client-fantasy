const CHANGE_REGULATION = 'CHANGE_REGULATION';
const CHANGE_PEP = 'CHANGE_PEP';

function changeRegulation(fieldsToChange) {
  return {
    type: CHANGE_REGULATION,
    fieldsToChange,
  };
}

function changePep(fieldsToChange) {
  return {
    type: CHANGE_PEP,
    fieldsToChange,
  };
}

export default {
  changeRegulation,
  changePep,
  CHANGE_REGULATION,
  CHANGE_PEP,
};
