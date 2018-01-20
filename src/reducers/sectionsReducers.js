import { SET_SECTIONS, SET_SECTION_PRIORITIES } from '../actions/Types.js';

const INITIAL_STATE = {
  sections: [],
  sectionPriorities: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SECTIONS: {
      const tempSections = state.sections.slice();
      if (tempSections.findIndex(i => i.key === action.payload.key) === -1)
        tempSections.push(action.payload);
      return { ...state, sections: tempSections };
    }
    case SET_SECTION_PRIORITIES: {
      return { ...state, sectionPriorities: action.payload };
    }
    default:
      return state;
  }
};
