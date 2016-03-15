const defaultState = {
  prospectId: undefined,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'PROSPECT_CREATED':
      return Object.assign({}, state, {
        prospectId: action.value,
      });
    default:
      return state;
  }
}
