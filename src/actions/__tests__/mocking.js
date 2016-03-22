function mockNNAPI(ret, method, sandbox, nnAPI) {
  return sandbox.stub(nnAPI, method, () => {
    return new Promise((resolve) => {
      resolve({ status: 200, data: ret });
    });
  });
}

function getDispatch(getState) {
  const dispatch = (action) => {
    if (typeof(action) === 'function') {
      action(dispatch, getState);
    }
  };

  return dispatch;
}

export default {
  mockNNAPI,
  getDispatch,
};
