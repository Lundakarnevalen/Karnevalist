import {
  SET_SECTIONS,
  SET_SECTION_PRIORITIES,
  REMOVE_SECTION_PRIO,
  ADD_SECTION_PRIO
} from '../actions/Types.js';
import { setFavoriteSections } from '../helpers/LocalSave';

const INITIAL_STATE = {
  sections: [],
  sectionPriorities: []
};

export default (state = INITIAL_STATE, action) => {
  let newSectionPriorities = null;
  switch (action.type) {
    case SET_SECTIONS: {
      return { ...state, sections: action.payload };
    }
    case SET_SECTION_PRIORITIES: {
      setFavoriteSections(action.payload);
      return { ...state, sectionPriorities: action.payload };
    }
    case REMOVE_SECTION_PRIO:
      newSectionPriorities = state.sectionPriorities.filter(
        sectionPrio => sectionPrio !== action.payload
      );
      setFavoriteSections(newSectionPriorities);
      return { ...state, sectionPriorities: newSectionPriorities };
    case ADD_SECTION_PRIO:
      newSectionPriorities = state.sectionPriorities.slice();
      newSectionPriorities.push(action.payload);
      setFavoriteSections(newSectionPriorities);
      return { ...state, sectionPriorities: newSectionPriorities };
    default:
      return state;
  }
};
