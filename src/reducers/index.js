import { combineReducers } from 'redux';
import userInformationReducers from './userInformationReducers';
import ThemeReducers from './ThemeReducers';

export default combineReducers({
  userInformation: userInformationReducers,
  currentTheme: ThemeReducers
});
