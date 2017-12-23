import { SET_TOKEN, SET_PICTURE, SET_EMAIL } from './Types.js';

export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token
  };
};

export const setEmail = email => {
  return {
    type: SET_EMAIL,
    payload: email
  };
};

export const setPicture = uri => {
  return {
    type: SET_PICTURE,
    payload: uri
  };
};
