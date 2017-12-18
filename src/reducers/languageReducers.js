import { SET_LANGUAGE } from '../actions/Types.js';

const INITIAL_STATE = {
  language: 'SE'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
};
