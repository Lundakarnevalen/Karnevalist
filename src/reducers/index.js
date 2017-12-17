import { combineReducers } from 'redux';
import userInformationReducers from './userInformationReducers';
import sectionsReducers from './sectionsReducers';
import ThemeReducers from './ThemeReducers';

export default combineReducers({
  userInformation: userInformationReducers,
  sections: sectionsReducers,
  currentTheme: ThemeReducers
});
