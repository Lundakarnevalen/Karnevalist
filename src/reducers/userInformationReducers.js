import { SET_TOKEN, SET_PICTURE, SET_EMAIL } from '../actions/Types.js';

const INITIAL_STATE = {
  token: null,
  email: null,
  picture: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PICTURE:
      return { ...state, picture: action.payload };
    default:
      return state;
  }
};
