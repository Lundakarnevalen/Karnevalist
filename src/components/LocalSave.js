import React from 'react';
import { AsyncStorage } from 'react-native';

export async function saveItem(key, value) {
  try {
     await AsyncStorage.setItem(key, value)
  } catch (error) {
    // Error saving data
  }
}

export async function getItem(key ,callback) {
  try {
    const response =  await AsyncStorage.getItem(key)
    if (response !== null) {
      return callback(response)
    }
  } catch (error) {
      callback(error)
  }
}

export async function getSections(cb) {
  const sections = AsyncStorage.getAllKeys((err, keys) => {
    const l = keys.filter(k => {
      return  k.includes('Sektion')
    })
    cb(l)
    AsyncStorage.multiGet(l, (err, stores) => {
      cb(stores.map((result, i, store) => {
      // get at each store's key/value so you can work with it
        let key = store[i][0];
        let value = store[i][1];
        return [key,value]
    }))
  })
})
}

export async function removeItem(key ,callback) {
  try {
    const response =  await AsyncStorage.removeItem(key)
    if (response !== null) {
      return callback(response)
    }
  } catch (error) {
      callback(error)
  }
}
