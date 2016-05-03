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



function getCaptainState(fullState){
  const newState = {};
  let allScorers = [];

  Object.keys(fullState).forEach(function(userId, index) {
    let tmpObj = {};

    newState[userId] = {};
    Object.keys(fullState[userId]).forEach(function(gameweek, index) {
      if(gameweek === 'username'){
        return false;
      }
      const weeklyPoints = fullState[userId][gameweek]['captainpoints'];
      if(weeklyPoints){ // TODO fix vice captaim
        allScorers.push(weeklyPoints);
      }
      let tmpObj = {
        'topscorer' : false,
        'captainpoints' : weeklyPoints,
      };
      newState[userId][gameweek] = tmpObj;

    });
  });
  return setTopScorer(newState, allScorers);
}

function setTopScorer(state, allScorers){
  const highest = Math.max(...allScorers);
  Object.keys(state).forEach(function(userId, index) {
    Object.keys(state[userId]).forEach(function(week, index) {
        if(state[userId][week]['captainpoints'] == highest){
          state[userId][week]['topscorer'] = true;
        }
    });
  });
  return state;
}
