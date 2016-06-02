import Promise from 'any-promise';

module.exports = class {
  constructor(twitterName) {
    this.twitterName = twitterName;
  }

  providerName() {
    return 'twitter';
  }

  getImageSize(size) {
      if (size <= 24)
          return 'mini';

      if (size <= 48)
          return 'normal';

      if (size <= 73)
          return 'bigger';

      return 'original';
  }

  avatar(size) {
    return new Promise((resolve) => {
      if (!this.twitterName) return reject(new Error('Twitter user name is not specified'));

      return resolve(`https://twitter.com/${this.twitterName}/profile_image?size=${getImageSize(size)}`);
    });
  }
}
