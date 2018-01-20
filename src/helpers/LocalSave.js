import { AsyncStorage } from 'react-native';

export function getFavoriteSections(callback) {
  AsyncStorage.getItem('sections', (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    let sections = [];
    if (result) {
      sections = JSON.parse(result);
    }
    callback(sections);
  });
}

export function getFavoriteSection(sectionId, callback) {
  getFavoriteSections(sections => {
    if (sections) {
      const index = getIndex(sections, sectionId);
      if (index !== -1) {
        callback(sections[index]);
      }
    }
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

export function saveFavoriteSections(sections, callback) {
  AsyncStorage.setItem('sections', JSON.stringify(sections), error => {
    if (error) {
      console.error(error);
      return;
    }
    callback(true);
  });
}

export function saveFavoriteSection(sectionId) {
  getFavoriteSections(sections => {
    if (sections) {
      sections.push(sectionId);
      saveFavoriteSections(sections);
    }
  });
}

export function saveItem(item, value) {
  AsyncStorage.setItem(item, value, error => {
    if (error) console.error(error);
  });
}

export function removeFavoriteSection(sectionId, callback) {
  getFavoriteSections(sections => {
    if (sections) {
      const index = getIndex(sections, sectionId);
      if (index !== -1) {
        sections.splice(index, 1);
        saveFavoriteSections(sections, result => {
          if (result) {
            callback(true);
          }
        });
      }
    }
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

function getIndex(array, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] + '' === value + '') {
      return i;
    }
  }
  return -1;
}
