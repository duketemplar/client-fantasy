const defaultState = {
  meta: {},
  identification: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'IDENTIFIED_PERSON':
      return Object.assign({}, state, {
        identification: action.value,
      });

    case 'PROSPECT_CREATED':
      return Object.assign({}, state, {
        meta: action.value,
      });
    default:
      return state;
  }
}
