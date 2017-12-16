import { SET_THEME } from '../actions/Types.js';

const INITIAL_STATE = {
  theme: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_THEME:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};