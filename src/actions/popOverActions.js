import { SET_POPOVER } from './Types';

export const setPopover = (screen, status) => ({
  type: SET_POPOVER,
  payload: {
    screen,
    status
  }
});
