import {
  SET_HOMESCREENPOPOVER,
  SET_SECTIONSCREENPOPOVER,
  SET_POPOVER
} from './Types';

export const setHomeScreenPopover = status => ({
  type: SET_HOMESCREENPOPOVER,
  payload: status
});

export const setSectionScreenPopover = status => ({
  type: SET_SECTIONSCREENPOPOVER,
  payload: status
});

export const setPopover = (screen, status) => ({
  type: SET_POPOVER,
  payload: {
    screen,
    status
  }
});
