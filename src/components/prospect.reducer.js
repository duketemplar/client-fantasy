const defaultState = {
  prospectInfo: {},
  regulationInfo: {},
};

export default function(state = defaultState, action) {
  switch (action.step) {
  case 'POST_PROSPECT_INFO':
    return Object.assign({}, state,
      {
        prospectInfo: action.value,
      }
    );
  case 'POST_REGULATION_DATA':
    return Object.assign({}, state,
      {
        regulationInfo: action.value,
      }
    );
  default:
    return state;
  }
}
