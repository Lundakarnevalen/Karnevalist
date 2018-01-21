import { NavigationActions } from 'react-navigation'

export const TOKEN_URL = 'https://api.10av10.com/api/hello/';
export const SECTION_URL = 'http://lundakarnevalen.se/wp-json/wp/v2/lksektion/';
export const IMAGE_URL = 'http://lundakarnevalen.se/wp-json/wp/v2/media/';
export const REGISTER_URL = 'https://api.10av10.com/register';
export const SECTION_PRIORITY_URL = 'https://api.10av10.com/api/section/';
export const FORGOT_PASSWORD_URL = 'https://api.10av10.com/login/forgotpassword';
export const LOGIN_URL = 'https://api.10av10.com/login/email';
export const USER_URL = 'https://api.10av10.com/api/user/';
export const PROGRESS = Object.freeze({
  CHECK_IN: 1,
  CHOOSE_SECTIONS: 2,
  SENT_SECTIONS: 3
})

export const LOGOUT_RESET_ACTION = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
  key: null
});
