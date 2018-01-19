import { AsyncStorage } from 'react-native';

export function getFavoriteSections(callback) {
  AsyncStorage.getItem('sections', (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    if (result) {
      callback(JSON.parse(result));
    } else {
      callback({});
    }
  });
}

export function getFavoritesOrder(callback) {
  AsyncStorage.getItem('sectionsOrder', (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    if (result) {
      callback(JSON.parse(result));
    } else {
      callback([]);
    }
  });
}

export function getFavoriteSection(sectionId, callback) {
  getFavoriteSections(result => {
    if (result) {
      callback(result[sectionId]);
    }
  });
}

export function getItem(item, callback) {
  AsyncStorage.getItem(item, (error, result) => {
    if (error) {
      console.error(error);
      return;
    }
    if (result) {
      callback(result);
    }
  });
}

export function saveFavoriteSections(sections) {
  AsyncStorage.setItem('sections', JSON.stringify(sections), error => {
    if (error) console.error(error);
  });
}

export function saveFavoritesOrder(order) {
  AsyncStorage.setItem('sectionsOrder', JSON.stringify(order), error => {
    if (error) console.error(error);
  });
}

export function saveFavoriteSection(sectionId) {
  getFavoriteSections(result => {
    if (result) {
      const sections = result;
      sections[sectionId] = '';
      saveFavoriteSections(sections);
    }
  });
  getFavoritesOrder(result => {
    if (result) {
      const order = result;
      order[order.length] = sectionId;
      saveFavoritesOrder(order);
    }
  });
}

export function saveItem(item, value) {
  AsyncStorage.setItem(item, value, error => {
    if (error) console.error(error);
  });
}

export function removeFavoriteSection(sectionId) {
  getFavoriteSections(result => {
    if (result) {
      const sections = {};
      const filteredResult = Object.keys(result).filter(key => key !== sectionId);
      for (let i = 0; i < filteredResult.length; i++) {
        sections[filteredResult[i]] = '';
      }
      saveFavoriteSections(sections);
    }
  });
  getFavoritesOrder(result => {
    if (result) {
      const filteredResult = Object.keys(result).filter(key => key !== sectionId);
      saveFavoritesOrder(filteredResult);
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
