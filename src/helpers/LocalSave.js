import { AsyncStorage } from 'react-native';

export function getFavoriteSections(callback) {
  AsyncStorage.getItem('sections').then(result => {
    const sections = JSON.parse(result) === null ? [] : JSON.parse(result);
    callback(sections);
  });
}

export function setFavoriteSections(sections) {
  AsyncStorage.setItem('sections', JSON.stringify(sections));
}

export function getPopoverStatus(key, callback) {
  AsyncStorage.getItem(key, (err, value) => {
    if (err) {
      return;
    }
    if (value != null) callback(false);
  });
}

export function setPopoverStatus(key, value) {
  AsyncStorage.setItem(key, value, err => {
    if (err) console.error(err);
  });
}

export function getItem(item, callback) {
  AsyncStorage.getItem(item, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    callback(result);
  });
}

export function saveItem(item, value) {
  AsyncStorage.setItem(item, value, error => {
    if (error) console.error(error);
  });
}

export function removeItem(item) {
  AsyncStorage.removeItem(item, error => {
    if (error) {
      console.error(error);
      return;
    }
  });
}
