import { SET_TOKEN, SET_PICTURE } from './Types.js';

export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token
  };
};

export const setPicture = uri => {
  return {
    type: SET_PICTURE,
    payload: uri
  };
};

