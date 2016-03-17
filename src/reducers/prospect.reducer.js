const defaultState = {
  prospectId: null,
  regulationId: null,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'PROSPECT_CREATED':
      return Object.assign({}, state, {
        prospectId: action.value,
      });
    case 'REGULATION_VALIDATED':
      return Object.assign({}, state, {
        regulationId: action.value,
      });
    default:
      return state;
  }
}
