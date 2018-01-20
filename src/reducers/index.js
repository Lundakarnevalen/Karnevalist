import { combineReducers } from 'redux';
import userInformationReducers from './userInformationReducers';
import sectionsReducers from './sectionsReducers';
import languageReducers from './languageReducers';

export default combineReducers({
  userInformation: userInformationReducers,
  sections: sectionsReducers,
  currentLanguage: languageReducers
});
