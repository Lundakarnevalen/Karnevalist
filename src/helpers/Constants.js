import { NavigationActions } from 'react-navigation';
import { Dimensions, Platform } from 'react-native';
import { Constants } from 'expo';
// URL constants
const BASE_URL = 'https://api.karnevalist.se';
export const TOKEN_URL = `${BASE_URL}/api/hello/`;
export const SECTION_URL = `${BASE_URL}/getallsections`;
export const IMAGE_URL = 'http://lundakarnevalen.se/wp-json/wp/v2/media/';
export const REGISTER_URL = `${BASE_URL}/register`;
export const SECTION_PRIORITY_URL = `${BASE_URL}/api/section/`;
export const FORGOT_PASSWORD_URL = `${BASE_URL}/login/forgotpassword`;
export const LOGIN_URL = `${BASE_URL}/login/email`;
export const USER_URL = `${BASE_URL}/api/user/`;
export const CHECK_IN_URL = `${BASE_URL}/api/user/checkin/`;
export const NEWS_URL =
  'http://lundakarnevalen.se/wp-json/wp/v2/posts?category=';

//
export const PROGRESS = Object.freeze({
  CREATE_PROFILE: 1,
  CHECK_IN: 2,
  CHOOSE_SECTIONS: 3,
  SENT_SECTIONS: 4
});

// Navigate reset action
export const LOGOUT_RESET_ACTION = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'SplashScreen' })],
  key: null
});

// Useful constants
export const HEIGHT = Dimensions.get('window').height;
export const WIDTH = Dimensions.get('window').width;
export const IS_IOS = Platform.OS === 'ios';
export const LANGUAGES = [
  { title: 'Svenska', val: 'SE' },
  { title: 'English', val: 'EN' }
];
export const NAVBAR_HEIGHT = IS_IOS ? 49 : 60;
export const HEADER_HEIGHT = IS_IOS ? 64 + 15 : 50 + Constants.statusBarHeight;
export const VIEW_HEIGHT = IS_IOS
  ? HEIGHT - 49 - HEADER_HEIGHT
  : HEIGHT - 60 - HEADER_HEIGHT;

export const PINK = '#FBBCC0';
