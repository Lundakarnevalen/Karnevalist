import { combineReducers } from 'redux';
import userInformationReducers from './userInformationReducers';
import sectionsReducers from './sectionsReducers';

export default combineReducers({
  userInformation: userInformationReducers,
  sections: sectionsReducers
});
