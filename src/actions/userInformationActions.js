import { SET_TOKEN, SET_PICTURE, SET_EMAIL, SET_PROGRESS, SET_USERINFO, RESET_DATA } from './Types.js';

// Set token
export const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token
  };
};

// Set email
export const setEmail = email => {
  return {
    type: SET_EMAIL,
    payload: email
  };
};

// Set picture
export const setPicture = uri => {
  return {
    type: SET_PICTURE,
    payload: uri
  };
};

// Set progress
export const setProgress = progress => {
  return {
    type: SET_PROGRESS,
    payload: progress
  };
};

export const setUserinfo = userinfo => {
  return {
    type: SET_USERINFO,
    payload: userinfo
  };
};
// Reset all data to initial state
export const resetData = () => {
  return {
    type: RESET_DATA
  };
};
