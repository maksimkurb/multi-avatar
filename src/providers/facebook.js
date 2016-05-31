import Promise from 'any-promise';

export default class {
  constructor(facebookId) {
    this.facebookId = facebookId;
  }

  providerName() {
    return 'facebook';
  }

  avatar(size) {
    return new Promise((resolve) => {
      if (!this.facebookId) resolve(null);

      resolve(`https://graph.facebook.com/${this.facebookId}/picture?width=${size}`);
    });
  }
}