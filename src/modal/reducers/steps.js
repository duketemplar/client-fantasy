import React from 'react';
import {STEP_INFO, STEP_USER_DATA, STEP_CONFIRM, STEP_SUBMITTING} from '../actions/action-types';
import _ from 'lodash';

import Info from '../components/info';
import UserData from '../components/user-data';
import Confirm from '../components/confirm';

export default function(state = {name: 'info', pane: <Info/>}, action) {
  console.log('reducer: ', action.step)
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
  case STEP_SUBMITTING:
    throw new Error('STEP_SUBMITTING: Not implemented yet....');
    /*
    return _.assign({}, state,
      {
        pane: </>,
      }
    );
    */
  default:
    return state;
  }
}
