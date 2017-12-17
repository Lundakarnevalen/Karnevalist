import { SET_LANG } from '../actions/Types.js';

const INITIAL_STATE = {
  lang: 'SE'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LANG:
      return { ...state, lang: action.payload };
    default:
      return state;
  }
};
