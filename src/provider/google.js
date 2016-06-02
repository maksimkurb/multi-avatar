import Promise from 'any-promise';
import fetch from 'node-fetch';
fetch.Promise = Promise;

module.exports = class {
  constructor(googleId, timeout = 5000) {
    this.googleId = googleId;
    this.timeout = timeout;

    this.pictureUrl = null;
    this.error = false;
  }

  providerName() {
    return 'google';
  }

  avatar(size) {
    return (new Promise((resolve, reject) => {
      if (!this.googleId) return reject(new Error('Google user ID is not specified'));
      if (!!this.error) return reject(this.error);

      if (!this.pictureUrl) {
        fetch(`https://picasaweb.google.com/data/entry/api/user/${this.googleId}?alt=json&fields=gphoto:thumbnail`, {
          timeout: this.timeout,
        })
        .then((res) => {
          if (res.status < 200 || res.status > 299) {
            if (res.status > 399 && res.status < 500) {
              this.error = new Error(res.statusText);
            }
            return reject(new Error(res.statusText));
          }
          return res.json();
        })
        .then((data) => {
          this.pictureUrl = data.entry.gphoto$thumbnail.$t;
          return resolve(this.pictureUrl);
        })
        .catch((err) => {
          return reject(err);
        });
      } else {
        return resolve(this.pictureUrl);
      }
    })
    .then((url) => url.replace('s64', 's' + size)));
  }
}
