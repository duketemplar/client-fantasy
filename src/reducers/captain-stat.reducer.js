import { GET_CAPTAIN_STAT } from './../actions/action.types';
import fullStat from './fantasy-stats.json';

export default function captainStat(state = {}, action) {
  switch (action.type) {
    case GET_CAPTAIN_STAT:
      const captain = getCaptainState(fullStat);
      return Object.assign({}, captain);
    default:
      return state;
  }
}
function setTopScorer(state, allScorers) {
  const newState = state;
  const highest = Math.max(...allScorers);
  Object.keys(newState).forEach(function(userId, index) {
    Object.keys(newState[userId]).forEach(function(week, index) {
      if (newState[userId][week]['captainpoints'] == highest) {
        newState[userId][week]['topscorer'] = true;
      }
    });
  });
  return state;
}


function getCaptainState(fullState) {
  const newState = {};
  const allScorers = [];

  Object.keys(fullState).forEach(function(userId, index) {
    newState[userId] = {};
    Object.keys(fullState[userId]).forEach(function (gameweek, index) {
      if (gameweek === 'username') {
        return false;
      }
      const weeklyPoints = fullState[userId][gameweek]['captainpoints'];
      if (weeklyPoints) { // TODO fix vice captaim
        allScorers.push(weeklyPoints);
      }
      const tmpObj = {
        topscorer: false,
        captainpoints: weeklyPoints,
      };
      newState[userId][gameweek] = tmpObj;
    });
  });
  return setTopScorer(newState, allScorers);
}
