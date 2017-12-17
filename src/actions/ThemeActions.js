import { SET_THEME } from './Types.js';

//Theme is an enum [morning, day, night]
export const setTheme = theme => {
  return {
    type: SET_THEME,
    payload: theme
  };
};
