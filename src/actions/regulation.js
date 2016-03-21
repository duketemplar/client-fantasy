const CHANGE_REGULATION = 'CHANGE_REGULATION';
const CHANGE_PEP = 'CHANGE_PEP';
const CHANGE_KYC = 'CHANGE_KYC';

function createOrUpdateRegulation() {
  return function action(dispatch, getState) {
    const regulation = getState().regulation;
    if (regulation.id !== undefined) {
      dispatch(updateRegulation());
    } else {
      dispatch(createRegulation());
    }
  };
}

function updateRegulation() {
  return function action(dispatch, getState) {
    const state = getState();
    const {
      kyc,
      pep,
      regulation,
    } = state;
    const data = { ...regulation, kyc, pep };
    console.log('update: ', data); // eslint-disable-line no-console

    // Use action
    // const header = { 'Content-type': 'application/json; charset=utf-8' };
    //
    // return new Promise((resolve, reject) => {
    //   nordnetAPI
    //   .post(CUSTOMERS_REGULATIONS_PATH, regulationData, header)
    //   .then(({ status, data }) => {
    //     if (status === 200) {
    //       store.dispatch({ type: 'REGULATION_VALIDATED', value: data.regulation_id });
    //       resolve();
    //     } else {
    //       reject(new Error('No regulation id recieved.'));
    //     }
    //   })
    //   .catch(error => reject(error));
    // });
  };
}

function createRegulation() {
  return function action(dispatch, getState) {
    const state = getState();
    const {
      kyc,
      pep,
      regulation,
    } = state;
    const data = { ...regulation, kyc, pep };
    console.log('create: ', data); // eslint-disable-line no-console
  };
}

function changeRegulation(fieldsToChange) {
  return {
    type: CHANGE_REGULATION,
    fieldsToChange,
  };
}

function changeKyc(fieldsToChange) {
  return {
    type: CHANGE_KYC,
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
  changeKyc,
  createOrUpdateRegulation,
  CHANGE_REGULATION,
  CHANGE_PEP,
  CHANGE_KYC,
};
