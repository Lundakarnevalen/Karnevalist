import { SET_SECTIONS, SET_SECTION_PRIORITIES } from './Types.js';

export const setSections = sections => {
  return {
    type: SET_SECTIONS,
    payload: sections
  };
};

export const setSectionPriorities = sectionPriorities => {
  return {
    type: SET_SECTION_PRIORITIES,
    payload: sectionPriorities
  };
};
