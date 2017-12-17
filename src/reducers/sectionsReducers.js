import { SET_SECTIONS } from '../actions/Types.js';

const INITIAL_STATE = {
  sections: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SECTIONS: {
      const tempSections = state.sections.slice()
      if (tempSections.findIndex(i => i.key === action.payload.key) === -1)
        tempSections.push(action.payload)
      return { ...state, sections: tempSections };
    }
    default:
      return state;
  }
};
