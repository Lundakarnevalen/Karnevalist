import axios from 'axios';
import React from 'react';
import { Dimensions, Image } from 'react-native';
import { SECTION_URL, NEWS_URL, USER_URL } from './Constants';

const WIDTH = Dimensions.get('window').width;

export function getNews() {
  return axios
    .get(NEWS_URL + '7')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}

function getImage(imageUrl) {
  return (
    <Image
      style={{ width: WIDTH, height: WIDTH, resizeMode: 'contain' }}
      source={{ uri: imageUrl }}
      defaultSource={require('../../res/Monstergubbe.png')}
    />
  );
}

function getRowImage(imageUrl) {
  return (
    <Image
      style={{
        width: 40,
        height: 40,
        alignSelf: 'center',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8
      }}
      source={{ uri: imageUrl }}
      defaultSource={require('../../res/Monstergubbe.png')}
    />
  );
}

export function fetchSections(cb) {
  axios
    .get(SECTION_URL)
    .then(response => {
      const sections = [];
      response.data.sections.forEach(item => {
        const { id, nameSv, imageUrl, textSv, textEn } = item;
        sections.push({
          key: id,
          id,
          title: { EN: nameSv, SE: nameSv },
          info: { EN: textEn, SE: textSv },
          image: getImage(imageUrl),
          rowImage: getRowImage(imageUrl)
        });
      });
      cb(sections);
    })
    .catch(error => {
      console.error(error);
    });
}

export function fetchUserinfo(email, token, cb = null) {
  const url = USER_URL + email;
  const headers = {
    Authorization: 'Bearer ' + token,
    'content-type': 'application/json'
  };
  axios
    .get(url, { headers })
    .then(response => {
      const { user } = response.data;
    if (typeof cb === 'function')
      cb(user)
    })
    .catch(error => {
      if (error.response.status === 401 && typeof cb === 'function')
        cb(error, true)
    });
}

export function handleErrorMsg(message, strings = null) {
  if (strings === null) return message;
  let msg;
  if (message.includes('400')) {
    msg = strings.errorMsg400;
  } else if (message.includes('401')) {
    msg = strings.errorMsg401;
  } else if (message.includes('404')) {
    msg = strings.errorMsg404;
  } else {
    msg = strings.errorMsgInternal;
  }
  return msg;
}
