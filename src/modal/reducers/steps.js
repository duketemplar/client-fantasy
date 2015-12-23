import React from 'react';
import {STEP_INFO, STEP_USER_DATA, STEP_CONFIRM, STEP_SUBMIT} from '../actions/action-types';
import _ from 'lodash';

import Info from '../components/info';
import UserData from '../components/user-data';
import Confirm from '../components/confirm';

const defaultState = {name: 'info', pane: <Info/>};

export default function(state = defaultState, action) {
  switch (action.step) {
  case STEP_INFO:
    return _.assign({}, state,
      {
        name: 'info',
        pane: <Info/>,
      }
    );
  case STEP_USER_DATA:
    return _.assign({}, state,
      {
        name: 'userdata',
        pane: <UserData/>,
      }
    );
  case STEP_CONFIRM:
    return _.assign({}, state,
      {
        name: 'confirm',
        pane: <Confirm/>,
      }
    );
  case STEP_SUBMIT:
    return _.assign({}, state,
      {
        name: 'submit',
        pane: null,
      }
    );
  default:
    return state;
  }
}
