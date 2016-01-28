import _ from 'lodash';

const defaultState = {
  prospectInfo: {},
  regulationInfo: {},
};

export default function(state = defaultState, action) {
  switch (action.step) {
  case 'POST_PROSPECT_INFO':
    return _.assign({}, state,
      {
        prospectInfo: action.value,
      }
    );
  case 'POST_REGULATION_DATA':
    return _.assign({}, state,
      {
        regulationInfo: action.value,
      }
    );
  default:
    return state;
  }
}
