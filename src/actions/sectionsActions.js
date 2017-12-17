import { SET_SECTIONS } from './Types.js';

export const setSections = sections => {
  return {
    type: SET_SECTIONS,
    payload: sections
  };
};
