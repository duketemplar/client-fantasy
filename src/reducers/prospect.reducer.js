const defaultState = {
  identification: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'IDENTIFIED_PERSON':
      return Object.assign({}, state, {
        identification: action.value,
      });
    default:
      return state;
  }
}
