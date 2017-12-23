import axios from 'axios';

const url = 'http://lundakarnevalen.se/wp-json/wp/v2/posts?category=';

export function getNews() {
  return axios
    .get(url + '7')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
    });
}


export function handleErrorMsg(message, strings = null) {
  if (strings === null)
    return message
  let msg
  if (message.includes('400')) {
    msg = strings.errorMsg400;
  } else if (message.includes('401')) {
    msg = strings.errorMsg401;
  } else if (message.includes('404')) {
    msg = strings.errorMsg404;
  } else {
    msg = strings.errorMsgInternal;
  }
  return msg
}
