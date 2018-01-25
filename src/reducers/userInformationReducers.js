import {
  SET_TOKEN,
  SET_PICTURE,
  SET_EMAIL,
  SET_PROGRESS,
  SET_USERINFO,
  RESET_DATA
} from '../actions/Types.js';
import { PROGRESS } from '../helpers/Constants'

// Initial state for user information
const INITIAL_STATE = {
  token: null,
  email: null,
  picture: null,
  progress: PROGRESS.CHECK_IN,
  userinfo: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PICTURE:
      return { ...state, picture: action.payload };
    case SET_PROGRESS:
      if (action.payload !== PROGRESS.SENT_SECTIONS)
        return { ...state, progress: action.payload };
      return { ...state };

    case SET_USERINFO:
    return { ...state, userinfo: action.payload };
    case RESET_DATA:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
