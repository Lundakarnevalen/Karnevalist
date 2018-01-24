import { SET_TOKEN, SET_PICTURE, SET_EMAIL, SET_PROGRESS, RESET_DATA } from './Types.js';

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

// Reset all data to initial state
export const resetData = () => {
  return {
    type: RESET_DATA
  };
};
