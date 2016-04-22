import nordnetAPI from 'nordnet-next-api';
import { CUSTOMERS_PROSPECTS_PATH } from '../utils/endpoints';
import { Prospect } from '../models';
import { push } from 'react-router-redux';

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

function createOrUpdateProspect(afterSuccessRedirect, condition) {
  return function action(dispatch, getState) {
    dispatch(getState().prospect.id ? updateProspect() : createProspect(afterSuccessRedirect, condition));
  };
}

function updateProspect() {
  return function action(dispatch, getState) {
    const prospect = getState().prospect;
    const prospectData = {
      phone_number: prospect.phoneNumber,
      email: prospect.email,
      citizen: prospect.citizen,
    };

    nordnetAPI
      .put(`${CUSTOMERS_PROSPECTS_PATH}/${prospect.id}`, prospectData, header)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(receivedProspect(new Prospect(data)));
        }
      })
      .catch(error => {
        console.error('Could not update regulation details:', error); // eslint-disable-line no-console
      });
  };
}

function createProspect(afterSuccessRedirect, condition) {
  return function action(dispatch, getState) {
    const prospect = getState().prospect;
    const prospectData = {
      national_id_number: prospect.nationalIdNumber,
      national_id_number_country_code: prospect.nationalIdNumberCountryCode,
      phone_number: prospect.phoneNumber,
      email: prospect.email,
      citizen: prospect.citizen,
    };

    nordnetAPI
      .post(CUSTOMERS_PROSPECTS_PATH, prospectData, header)
      .then(({ status, data }) => {
        if (status === 200) {
          dispatch(receivedProspect(new Prospect(data)));
          if (afterSuccessRedirect && (condition === undefined || condition(data))) {
            dispatch(push(afterSuccessRedirect));
          }
        }
      })
      .catch(error => {
        console.error('Could not update regulation details:', error); // eslint-disable-line no-console
      });
  };
}

function freezeProspect() {
  return function action(dispatch, getState) {
    const prospectId = getState().prospect.id;
    nordnetAPI
      .post(`${CUSTOMERS_PROSPECTS_PATH}/${prospectId}/freeze`, { })
      .then(({ status }) => {
        if (status === 204) {
          dispatch(changeProspect({ frozen: true }));
        }
      })
      .catch(error => {
        console.error('Could not freeze the prospect:', error); // eslint-disable-line no-console
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
  updateProspect,
  receivedProspect,
  createOrUpdateProspect,
  changeProspect,
  freezeProspect,
  CREATE_PROSPECT,
  RECEIVED_PROSPECT,
  CHANGE_PROSPECT,
};
