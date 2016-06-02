import Promise from 'any-promise';
import fetch from 'node-fetch';
fetch.Promise = Promise;

module.exports = class {
  constructor(vkId, timeout = 5000) {
    this.vkId = vkId;
    this.timeout = timeout;

    this.pictureUrls = null;
    this.error = false;
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
    return (new Promise((resolve, reject) => {
      if (!this.vkId) return reject(new Error('Vk user ID is not specified'));
      if (!!this.error) return reject(this.error);

      if (!this.pictureUrls) {
        fetch(`https://api.vk.com/method/users.get?user_id=${this.vkId}&v=5.8&fields=photo_50,photo_100,photo_200`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          if (data.error) {
            if (data.error.error_code == 100) {
              this.error = new Error(data.error.error_msg);
            }
            return reject(new Error(data.error.error_msg));
          }

          this.pictureUrls = [
            data.response[0].photo_50,
            data.response[0].photo_100,
            data.response[0].photo_200,
          ]
          return resolve();
        });
      } else {
        return resolve();
      }
    })
    .then(() => this.pictureUrls[this.getImageSize(size)]));
  }
}
