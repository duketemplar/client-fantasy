const CHANGE_TAX_INFO = 'CHANGE_TAX_INFO';

function changeTaxInfo(fieldsToChange) {
  return {
    type: CHANGE_TAX_INFO,
    fieldsToChange,
  };
}

export default {
  changeTaxInfo,
  CHANGE_TAX_INFO,
};
