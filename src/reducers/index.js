import { combineReducers } from 'redux';
import userInformationReducers from './userInformationReducers';

export default combineReducers({
  userInformation: userInformationReducers
});
