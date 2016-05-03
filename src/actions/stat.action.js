import { GET_CAPTAIN_STAT } from './action.types';

export function getCaptainStat(data) {
  return {
    data,
    type: GET_CAPTAIN_STAT,
  };
}

export default {
  getCaptainStat,
  GET_CAPTAIN_STAT,
};
