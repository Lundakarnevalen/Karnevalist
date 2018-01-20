import { SET_LANGUAGE } from './Types.js';

export const setLanguage = language => {
  return {
    type: SET_LANGUAGE,
    payload: language
  };
};
