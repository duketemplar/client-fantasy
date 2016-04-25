const UPDATE_SIGN = 'UPDATE_SIGN';

function toggleAcceptedAggreements(hasAccepted) {
  return (dispatch) => {
    dispatch(updateSign({ acceptedAgreements: hasAccepted }));
  };
}

function updateSign(data) {
  return {
    type: UPDATE_SIGN,
    data,
  };
}

export default {
  UPDATE_SIGN,
  toggleAcceptedAggreements,
};
