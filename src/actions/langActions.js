import { SET_LANG } from './Types.js';

export const setLang = lang => {
  return {
    type: SET_LANG,
    payload: lang
  };
};
