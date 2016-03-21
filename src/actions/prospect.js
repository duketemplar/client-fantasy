import nordnetAPI from 'nordnet-next-api';
import { CUSTOMERS_PROSPECTS_PATH } from '../utils/endpoints';
import { Prospect } from '../models';

const CREATE_PROSPECT = 'CREATE_PROSPECT';
const RECEIVED_PROSPECT = 'RECEIVED_PROSPECT';
const CHANGE_PROSPECT = 'CHANGE_PROSPECT';
const header = { 'Content-type': 'application/json; charset=utf-8' };

function changeProspect(fieldsToChange) {
  return {
    type: CHANGE_PROSPECT,
    fieldsToChange,
  };
}

function createOrUpdateProspect() {
  return function action(dispatch, getState) {
    dispatch(getState().prospect.prospect_id ? updateProspect() : createProspect());
  };
}

function updateProspect() {
  return function action(dispatch, getState) {
    const prospect = getState().prospect;
    nordnetAPI
      .put(`${CUSTOMERS_PROSPECTS_PATH}/` + prospect.prospect_id, { ...prospect }, header)
      .then((data) => {
        if (data.status === 200) {
          dispatch(receivedProspect(new Prospect(data.data)));
        }
      })
      .catch(error => {
        console.error('Could not update regulation details:', error); // eslint-disable-line no-console
      });
  };
}

function createProspect() {
  return function action(dispatch, getState) {
    const prospect = getState().prospect;
    nordnetAPI
      .post(`${CUSTOMERS_PROSPECTS_PATH}`, { ...prospect }, header)
      .then((data) => {
        if (data.status === 200) {
          dispatch(receivedProspect(new Prospect(data.data)));
        }
      })
      .catch(error => {
        console.error('Could not update regulation details:', error); // eslint-disable-line no-console
      });
  };
}

function receivedProspect(prospect) {
  return {
    type: RECEIVED_PROSPECT,
    prospect,
  };
}

export default {
  createProspect,
  receivedProspect,
  createOrUpdateProspect,
  changeProspect,
  CREATE_PROSPECT,
  RECEIVED_PROSPECT,
  CHANGE_PROSPECT,
};
