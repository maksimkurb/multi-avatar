import Promise from 'any-promise';
import fetch from 'node-fetch';
fetch.Promise = Promise;

module.exports = class {
  constructor(googleId) {
    this.googleId = googleId;
    this.pictureUrl = null;
  }

  providerName() {
    return 'google';
  }

  avatar(size) {
    return (new Promise((resolve) => {
      if (!this.googleId) resolve(null);

      if (!this.pictureUrl) {
        fetch(`https://picasaweb.google.com/data/entry/api/user/${this.googleId}?alt=json&fields=gphoto:thumbnail`)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          this.pictureUrl = data.entry.gphoto$thumbnail.$t;
          resolve();
        });
      } else {
        resolve();
      }
    })
    .then(() => this.pictureUrl.replace('s64', 's' + size)));
  }
}
