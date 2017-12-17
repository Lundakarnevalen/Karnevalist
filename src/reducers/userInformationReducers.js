import { SET_TOKEN, SET_PICTURE } from '../actions/Types.js';

const INITIAL_STATE = {
  token: null,
  picture: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_PICTURE:
      return { ...state, picture: action.payload };
    default:
      return state;
  }
};
