module.exports = function(providers) {
  return new MultiAvatar(providers);
}
module.exports.FacebookAvatarProvider = require('./provider/facebook')
module.exports.GoogleAvatarProvider = require('./provider/google')
module.exports.TwitterAvatarProvider = require('./provider/twitter')
module.exports.VkAvatarProvider = require('./provider/vk')

class MultiAvatar {
  constructor(providers) {
    this.providers = (Array.isArray(providers) ? providers : [providers]);
  }

  requestAll(size) {
    return Promise.all(
      this.providers.map((provider) => provider.avatar(size))
    );
  }

  withSize(size) {
    return this
    .requestAll(size)
    .then((value) => {
      return this.providers.reduce((r, provider, i) => {
        r[provider.providerName()] = value[i];
        return r;
      }, {});
    });
  }

  withSizes(sizes) {
    const firstSize = sizes[0];
    let firstValue = null;
    return this.requestAll(firstSize)
    .then((value) => { // this required to caching be done, after we can fetch other sizes url from cache
      firstValue = value;
      sizes.shift();
      return Promise.all(
        sizes.map((size) => this.requestAll(size))
      );
    })
    .then((value) => {
      sizes.unshift(firstSize);
      value.unshift(firstValue);
      return this.providers.reduce((r, provider, i) => {
        r[provider.providerName()] = value.reduce((a, sizeBlock, sizeIndex) => {
          a[sizes[sizeIndex]] = sizeBlock[i];
          return a;
        }, {});
        return r;
      }, {});
    })
  }
}
