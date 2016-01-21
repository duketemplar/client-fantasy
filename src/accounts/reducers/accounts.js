/*
 * File contains Redux reducers for operating on the state related to the accounts component.
 * Actions describe the fact that something has changed in the application.
 * Reducers define how these changes should be affecting the state of the application.
 * Reducer is a pure function that takes the previous state and an action, and returns the next state: (previousState, action) => newState
 * Reducers should always either return new state, or return existing state by default.
 * Reducers should nerver modify its arguments or perform any of the side effects like API calls or routing transitions.
 *
 * See http://rackt.github.io/redux/docs/basics/Reducers.html for more details on Reducers.
 */

import _ from 'lodash';

// imports action types which are defined as constants in a separate file
import { ACCOUNTS_REQUEST, ACCOUNTS_REQUEST_SUCCESS, ACCOUNTS_REQUEST_FAILURE } from '../actions/action-types';

/*
 * Exports default reducer function. Reducer operates on a part of an application state.
 * For each supported action type reducer returns a new state.
 * For action types that are unknow to the reducer current state is returned.
 */
export default function accounts(state = { isFetching: false, accounts: [] }, action) {
  switch (action.type) {

    // indicates that accounts loading request is in progress
    // returns new state
    case ACCOUNTS_REQUEST:
      return _.assign({}, state, {
        isFetching: true,
      });

    // indicates that accounts request successfully loaded data
    // returns new state with accounts array
    case ACCOUNTS_REQUEST_SUCCESS:
      return _.assign({}, state, {
        isFetching: false,
        accounts: action.data,
      });

    // indicates that accounts request failed
    // returns new state with empty accounts array
    case ACCOUNTS_REQUEST_FAILURE:
      return _.assign({}, state, {
        isFetching: false,
        accounts: [],
      });

      // returns current state for all other action types
    default:
      return state;
  }
}
