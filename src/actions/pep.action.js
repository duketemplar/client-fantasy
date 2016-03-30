const CHANGE_PEP = 'CHANGE_PEP';

function changePep(fieldsToChange) {
  return {
    type: CHANGE_PEP,
    fieldsToChange,
  };
}
export default {
  changePep,
  CHANGE_PEP,
};
