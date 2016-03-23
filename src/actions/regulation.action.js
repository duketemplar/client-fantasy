import nordnetAPI from 'nordnet-next-api';
import { CUSTOMERS_REGULATIONS_PATH } from '../utils/endpoints';
import { createOrUpdateProspect } from './';

const CHANGE_REGULATION = 'CHANGE_REGULATION';
const RECEIVED_REGULATION = 'RECEIVED_REGULATION';
const CHANGE_PEP = 'CHANGE_PEP';
const CHANGE_KYC = 'CHANGE_KYC';

const header = { 'Content-type': 'application/json; charset=utf-8' };

function createOrUpdateRegulation() {
  return function action(dispatch, getState) {
    const regulation = getState().regulation;
    if (regulation.id !== undefined && regulation.id !== null) {
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
    const regulationData = {
      taxable_in_jurisdiction: regulation.taxableInJurisdiction,
      taxable_outside_jurisdiction: regulation.taxableOutsideJurisdiction,
      pep: {
        is_pep: pep.isPep,
      },
      kyc: {
        some_key: kyc.some_key,
      },
      tax_info: {

      },
    };

    nordnetAPI
      .put(`${CUSTOMERS_REGULATIONS_PATH}/${state.regulation.id}`, regulationData, header)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(receivedRegulation(data));
          dispatch(createOrUpdateProspect());
        } else {
          // Do something
        }
      })
      .catch(error => error);
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
    const regulationData = { ...regulation, kyc, pep };

    nordnetAPI
      .post(CUSTOMERS_REGULATIONS_PATH, regulationData, header)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(receivedRegulation(data));
          dispatch(createOrUpdateProspect());
        } else {
          // Do something
        }
      })
      .catch(error => error);
  };
}

function receivedRegulation(regulation) {
  return {
    type: RECEIVED_REGULATION,
    regulation,
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
  receivedRegulation,
  createRegulation,
  updateRegulation,
  CHANGE_REGULATION,
  CHANGE_PEP,
  CHANGE_KYC,
  RECEIVED_REGULATION,
};
