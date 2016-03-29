const CHANGE_KYC = 'CHANGE_KYC';

function changeKyc(fieldsToChange) {
  return {
    type: CHANGE_KYC,
    fieldsToChange,
  };
}

export default {
  changeKyc,
  CHANGE_KYC,
};
