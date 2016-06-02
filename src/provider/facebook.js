import Promise from 'any-promise';

module.exports = class {
  constructor(facebookId) {
    this.facebookId = facebookId;
  }

  providerName() {
    return 'facebook';
  }

  avatar(size) {
    return new Promise((resolve) => {
      if (!this.facebookId) return reject(new Error('Facebook user ID is not specified'));

      return resolve(`https://graph.facebook.com/${this.facebookId}/picture?width=${size}`);
    });
  }
}
