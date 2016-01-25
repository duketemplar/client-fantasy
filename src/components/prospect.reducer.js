import _ from 'lodash';

const defaultState = {
  civicNum: -1,
  customerRegulationId: -1,
};

export default function(state = defaultState, action) {
  switch (action.step) {
  case 'POST_PROSPECT_INFO':
    return _.assign({}, state,
      {
        civicNum: action.value,
      }
    );
  case 'POST_REGULATION_DATA':
    return _.assign({}, state,
      {
        customerRegulationId: action.value,
      }
    );
  default:
    return state;
  }
}
