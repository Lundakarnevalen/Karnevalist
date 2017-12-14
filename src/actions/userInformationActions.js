import { SET_TOKEN } from './Types.js';

export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token
  };
};
