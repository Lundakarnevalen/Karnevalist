import { AsyncStorage } from 'react-native';

export function getItem(key, callback) {
  AsyncStorage.getItem(key, (err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    callback(result);
  });
}

export function saveItem(key, value) {
  AsyncStorage.setItem(key, value, err => {
    if (err) console.error(err);
  });
}

export function getSections(cb) {
  AsyncStorage.getAllKeys((err, keys) => {
    const sectionKeys = keys.filter(k => k.includes('sektion'));
    AsyncStorage.multiGet(sectionKeys, (error, stores) => {
      cb(
        stores.map((result, i, store) => {
          const key = store[i][0];
          const value = store[i][1];
          return { key, value };
        })
      );
    });
  });
}

export function removeItem(key) {
  AsyncStorage.removeItem(key, error => {
    if (error) {
      console.error(error);
      return;
    }
  });
}
export function removeItems(keys) {
  AsyncStorage.multiRemove(keys, err => {
    if (err) console.error(err);
  });
}
