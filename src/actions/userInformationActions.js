import {
  SET_TOKEN,
  SET_PICTURE,
  SET_EMAIL,
  SET_PROGRESS,
  SET_USERINFO,
  RESET_DATA
} from './Types.js';

// Set token
export const setToken = token => ({
    type: SET_TOKEN,
    payload: token
  });

// Set email
export const setEmail = email => ({
    type: SET_EMAIL,
    payload: email
  });

// Set picture
export const setPicture = uri => ({
    type: SET_PICTURE,
    payload: uri
  });

// Set progress
export const setProgress = progress => ({
    type: SET_PROGRESS,
    payload: progress
  });

export const setUserinfo = userinfo => ({
    type: SET_USERINFO,
    payload: userinfo
  });
// Reset all data to initial state
export const resetData = () => ({
    type: RESET_DATA
  });
