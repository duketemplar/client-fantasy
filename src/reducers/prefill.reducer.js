const prefillReducer = (state = {}, action) => {
  switch (action.type) {
    case 'IDENTIFIED_PERSON':
      const formData = {};

      Object.keys(action.value).forEach(key => {
        formData[key] = { value: action.value[key] };
      });

      return Object.assign({}, state, formData);
    default:
      return state;
  }
};

export default prefillReducer;
