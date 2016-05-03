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

  Object.keys(fullState).forEach(function(userId, index) {
    let tmpObj = {};
    let allScorers = [];
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
        'topscorer' : isTopscorer(allScorers, weeklyPoints, index),
        'captainpoints' : weeklyPoints,
      };
      newState[userId][gameweek] = tmpObj;

    });
  });
  console.log('newState', newState);
  return newState;
}

function isTopscorer(allScorers, current){
  if(allScorers.length === 1){ // TODO fix first position
    return false;
  }
  const highest = Math.max(...allScorers);
  return current >= highest;
}
