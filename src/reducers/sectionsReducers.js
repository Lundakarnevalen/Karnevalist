import { SET_SECTIONS, SET_SECTION_PRIORITIES } from '../actions/Types.js';

const INITIAL_STATE = {
  sections: [],
  sectionPriorities: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SECTIONS: {
      return { ...state, sections: action.payload };
    }
    case SET_SECTION_PRIORITIES: {
      return { ...state, sectionPriorities: action.payload };
    }
    default:
      return state;
  }
};
