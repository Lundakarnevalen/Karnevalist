import { SET_TOKEN, SET_PICTURE, SET_EMAIL, SET_PROGRESS, SET_USERINFO } from './Types.js';

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
