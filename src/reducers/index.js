import { combineReducers } from 'redux';
import userInformationReducers from './userInformationReducers';
import sectionsReducers from './sectionsReducers';
import languageReducers from './languageReducers';
import popoverReducers from './popoverReducers';

export default combineReducers({
  userInformation: userInformationReducers,
  sections: sectionsReducers,
  currentLanguage: languageReducers,
  popoverStatus: popoverReducers
});
