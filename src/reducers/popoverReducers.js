import {
  SET_POPOVER,
  SET_HOMESCREENPOPOVER,
  SET_SECTIONSCREENPOPOVER
} from '../actions/Types.js';
import { setPopoverStatus } from '../helpers/LocalSave';

const INITIAL_STATE = {
  homeScreenPopover: true,
  sectionScreenPopover: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_HOMESCREENPOPOVER: {
      if (action.payload === false) {
        setPopoverStatus('homeScreenPopover', 'homeScreenPopover');
      }
      return { ...state, homeScreenPopover: action.payload };
    }
    case SET_SECTIONSCREENPOPOVER: {
      if (action.payload === false) {
        setPopoverStatus('sectionScreenPopover', 'sectionScreenPopover');
      }
      return { ...state, sectionScreenPopover: action.payload };
    }
    case SET_POPOVER: {
      const { status, screen } = action.payload;
      if (status === false) {
        setPopoverStatus(screen, screen);
      }
      return { ...state, [screen]: status };
    }
    default:
      return state;
  }
};
