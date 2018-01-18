import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { removeItem } from './LocalSave';

export function dynamicSort(property) {
  let sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export function logout(navigation, expiredToken = false, title = '', message = '') {
  removeItem('email');
  removeItem('accessToken');
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
    key: null
  });
  navigation.dispatch(resetAction);
  if (expiredToken) Alert.alert(title, message);
}
