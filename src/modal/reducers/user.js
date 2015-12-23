import _ from 'lodash';

import {USERDATA_UPDATE, USERDATA_RESET} from '../actions/action-types';

const defaultState = {data: {}};

export default function(state = defaultState, action) {
  switch (action.process) {
  case USERDATA_UPDATE:
    return _.assign({}, state, {data: action.data});
  case USERDATA_RESET:
    return _.assign({}, state, {data: {}});
  default:
    return state;
  }
}
