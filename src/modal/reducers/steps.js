import React from 'react';
import {STEP_INFO, STEP_SUMMARY, STEP_CONFIRM} from '../actions/action-types';
import _ from 'lodash';

import Info from '../components/info';
import Summary from '../components/summary';
import Confirm from '../components/confirm';

export default function(state = {step: STEP_INFO, pane: <Info/>}, action) {
  switch (action.step) {
  case STEP_INFO:
    return _.assign({}, state,
      {
        step: STEP_SUMMARY,
        pane: <Summary/>,
      }
    );
  case STEP_SUMMARY:
    return _.assign({}, state,
      {
        step: STEP_CONFIRM,
        pane: <Confirm/>,
      }
    );
  case STEP_CONFIRM:
    return _.assign({}, state,
      {
        step: STEP_SUBMITTING,
        pane: <Confirm/>,
      }
    );
  default:
    return state;
  }
}
