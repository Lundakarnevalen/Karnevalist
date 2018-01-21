import { NavigationActions } from 'react-navigation'

const BASE_URL = 'https://api.10av10.com'
export const TOKEN_URL = BASE_URL + '/api/hello/';
export const SECTION_URL = 'http://lundakarnevalen.se/wp-json/wp/v2/lksektion/';
export const IMAGE_URL = 'http://lundakarnevalen.se/wp-json/wp/v2/media/';
export const REGISTER_URL = BASE_URL + '/register';
export const SECTION_PRIORITY_URL = BASE_URL + '/api/section/';
export const FORGOT_PASSWORD_URL = BASE_URL + '/login/forgotpassword';
export const LOGIN_URL = BASE_URL + '/login/email';
export const USER_URL = BASE_URL + '/api/user/';
export const NEWS_URL = 'http://lundakarnevalen.se/wp-json/wp/v2/posts?category=';

export const PROGRESS = Object.freeze({
  REGISTER: 0,
  CHECK_IN: 1,
  CHOOSE_SECTIONS: 2,
  SENT_SECTIONS: 3
})

export const LOGOUT_RESET_ACTION = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
  key: null
});
