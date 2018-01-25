import { SET_HOMESCREENPOPOVER, SET_SECTIONSCREENPOPOVER } from './Types';

export const setHomeScreenPopover = status => {
  return {
    type: SET_HOMESCREENPOPOVER,
    payload: status
  };
};

export const setSectionScreenPopover = status => {
  return {
    type: SET_SECTIONSCREENPOPOVER,
    payload: status
  };
};
