import Promise from 'any-promise';
import fetch from 'node-fetch';
fetch.Promise = Promise;

module.exports = class {
  constructor(vkId) {
    this.vkId = vkId;
    this.pictureUrls = null;
  }

  providerName() {
    return 'vk';
  }

  getImageSize(size) {
      if (size <= 50)
          return 0;

      if (size <= 100)
          return 1;

      return 2;
  }


  avatar(size) {
    return (new Promise((resolve) => {
      if (!this.vkId) resolve(null);

      if (!this.pictureUrls) {
        fetch(`https://api.vk.com/method/users.get?user_id=${this.vkId}&v=5.8&fields=photo_50,photo_100,photo_200`)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          this.pictureUrls = [
            data.response[0].photo_50,
            data.response[0].photo_100,
            data.response[0].photo_200,
          ]
          resolve();
        });
      } else {
        resolve();
      }
    })
    .then(() => this.pictureUrls[this.getImageSize(size)]));
  }
}
