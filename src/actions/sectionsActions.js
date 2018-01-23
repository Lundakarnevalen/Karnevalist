import {
  SET_SECTIONS,
  SET_SECTION_PRIORITIES,
  REMOVE_SECTION_PRIO,
  ADD_SECTION_PRIO
} from './Types.js';

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

export const removeSectionPriority = sectionId => {
  return {
    type: REMOVE_SECTION_PRIO,
    payload: sectionId
  };
};

export const addSectionPriority = sectionId => {
  return {
    type: ADD_SECTION_PRIO,
    payload: sectionId
  };
};
