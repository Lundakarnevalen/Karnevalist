import { SET_POPOVER } from '../actions/Types';
import { setPopoverStatus } from '../helpers/LocalSave';

const INITIAL_STATE = {
  homeScreenPopover: false,
  sectionScreenPopover: false,
  songBookScreenPopover: true
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
