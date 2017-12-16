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
