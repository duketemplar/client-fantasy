/*
 * File contains action types definition. Action types are defined as string constants.
 * Action type names should be consistent and should reflect what is happenning when action with such type is triggered.
 *
 * _REQUEST suffix indicates that request is in progress.
 * _REQUEST_SUCCESS suffix indicates that request succeeded.
 * _REQUEST_FAILURE suffix indicates that request failed.
 * Additional action types could be defined if more fine-grained error handling is needed.
 *
 * For more info on actions, action types and action creators
 * see http://rackt.github.io/redux/docs/basics/Actions.html and https://rackt.github.io/redux/docs/advanced/AsyncActions.html
 */

// action type that is triggered when accoutns are being loaded
export const ACCOUNTS_REQUEST = 'ACCOUNTS_REQUEST';

// action type that is triggered when accounts have been successfully loaded
export const ACCOUNTS_REQUEST_SUCCESS = 'ACCOUNTS_REQUEST_SUCCESS';

// action type that is triggered when request to load accounts has failed
export const ACCOUNTS_REQUEST_FAILURE = 'ACCOUNTS_REQUEST_FAILURE';
