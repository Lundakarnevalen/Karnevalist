import { SET_SECTIONS } from '../actions/Types.js';

const INITIAL_STATE = {
  sections: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SECTIONS:
      return { ...state, sections: action.payload };
    default:
      return state;
  }
};
