import axios from 'axios';
import React from 'react';
import { Dimensions, Image } from 'react-native';
import {
  SECTION_URL,
  IMAGE_URL,
  NEWS_URL,
  CHECK_IN_URL,
  SECTION_PRIORITY_URL,
  PROGRESS
} from './Constants';
import { stripHtmlString } from './functions';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export function getNews() {
  return axios
    .get(NEWS_URL + '7')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}

function fetchImage(url, section, cb) {
  const tempSection = section;
  axios
    .get(url)
    .then(r => {
      const image = (
        <Image
          style={{ width: WIDTH, height: WIDTH, resizeMode: 'contain' }}
          source={{ uri: r.data.source_url }}
          defaultSource={require('../../res/Monstergubbe.png')}
        />
      );

      const rowImage = (
        <Image
          style={{
            width: 40,
            height: 40,
            alignSelf: 'center',
            marginLeft: 10,
            marginRight: 10,
            borderRadius: 8
          }}
          source={{ uri: r.data.source_url }}
          defaultSource={require('../../res/Monstergubbe.png')}
        />
      );

      tempSection.imguri = r.data.source_url;
      tempSection.image = image;
      tempSection.rowImage = rowImage;
      cb(tempSection);
      // this.props.setSections(tempSection);
      return tempSection;
    })
    .catch(error => {
      console.error(error);
    });
}

export function fetchCheckInStatus(email, token, callback) {
  const URL = CHECK_IN_URL + email;
  const headers = {
    Authorization: 'Bearer ' + token
  };
  axios.get(URL, { headers }).then(response => {
    callback(response.data.checkedIn);
  });
}

export function getSectionPriorities(token) {
  const headers = {
    Authorization: 'Bearer ' + token,
    'content-type': 'application/json'
  };
  axios
    .get(SECTION_PRIORITY_URL, { headers })
    .then(response => {
      const { success, sectionPriorities } = response.data;
      if (success) {
        this.props.setSectionPriorities(sectionPriorities);
        if (sectionPriorities.length > 0) this.props.setProgress(PROGRESS.SENT_SECTIONS);
      }
    })
    .catch(error => {
      // const msg = handleErrorMsg(error.message)
      console.log(error);
    });
}

export function fetchSections(cb) {
  axios
    .get(SECTION_URL)
    .then(response => {
      response.data.forEach(item => {
        const strippedContent = stripHtmlString(item.content.rendered);
        const strippedTitle = stripHtmlString(item.title.rendered);
        const imgId = item.featured_media;
        const imgUrl = IMAGE_URL + imgId;
        const section = {
          key: item.id,
          id: item.id,
          title: strippedTitle,
          info: strippedContent
        };
        fetchImage(imgUrl, section, cb);
      });
    })
    .catch(error => {
      console.error(error);
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
