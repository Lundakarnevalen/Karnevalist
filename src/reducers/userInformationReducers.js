import { SET_TOKEN } from '../actions/Types.js';

const INITIAL_STATE = {
  token: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    default:
      return state;
  }
};
