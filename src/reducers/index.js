import { combineReducers } from 'redux';
import userInformationReducers from './userInformationReducers';
import sectionsReducers from './sectionsReducers';
import ThemeReducers from './ThemeReducers';
import languageReducers from './languageReducers';

export default combineReducers({
  userInformation: userInformationReducers,
  sections: sectionsReducers,
  currentTheme: ThemeReducers,
  currentLanguage: languageReducers
});
