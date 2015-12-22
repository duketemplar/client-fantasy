import {STEP_INFO, STEP_SUMMARY, STEP_CONFIRM} from '../actions/action-types';
import {_} from 'lodash';

export default function(state = { step: STEP_INFO}, action) {
  switch (action.step) {
  case STEP_INFO:
    return _.assign({}, state, {step: STEP_SUMMARY});
  case STEP_SUMMARY:
    return _.assign({}, state, {step: STEP_CONFIRM});
  case STEP_CONFIRM:
    return _.assign({}, state, {step: STEP_SUBMITTING});
  default:
    return state;
  }
}
