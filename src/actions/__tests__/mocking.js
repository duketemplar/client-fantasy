function mockNNAPI(ret, method, sandbox, nnAPI) {
  const promise = new Promise((resolve) => {
    resolve({ status: 200, data: ret });
  });

  const stub = sandbox.stub(nnAPI, method, () => {
    return promise;
  });

  stub.promise = promise;
  return stub;
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
