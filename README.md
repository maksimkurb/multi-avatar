# MultiAvatar - a nice way to fetch avatars
[![Build Status](https://img.shields.io/travis/maksimkurb/multi-avatar/master.svg?maxAge=2592000&style=flat-square)](https://travis-ci.org/maksimkurb/multi-avatar)
[![GitHub issues](https://img.shields.io/github/issues/maksimkurb/multi-avatar.svg?maxAge=2592000&style=flat-square)](https://github.com/maksimkurb/multi-avatar/issues)
[![David](https://img.shields.io/david/maksimkurb/multi-avatar.svg?maxAge=2592000&style=flat-square)](https://david-dm.org/maksimkurb/multi-avatar#info=dependencies)
[![David](https://img.shields.io/david/dev/maksimkurb/multi-avatar.svg?maxAge=2592000&style=flat-square)](https://david-dm.org/maksimkurb/multi-avatar#info=devDependencies)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?maxAge=2592000&style=flat-square)](https://raw.githubusercontent.com/maksimkurb/multi-avatar/master/LICENSE)
___

This library allows you to get user avatar URLs from various social-networks without diving into their APIs.

### Supported providers
* Facebook
```js
  new FacebookAvatarProvider('FacebookUserID')
```
* Google
```js
  new GoogleAvatarProvider('GoogleUserID')
```
* Twitter
```js
  new TwitterAvatarProvider('TwitterUsername') // without '@', e.g. 'IGN' or 'pcgamer'
```
* Vkontakte
```js
  new VkAvatarProvider('VkID')
```

## Installation
```
npm install multi-avatar
```

## How to fetch user avatar URL
Some services forces us to make a API-requests. This is why library uses Promises ([any-promise](https://github.com/kevinbeaty/any-promise)) and URLs caching.
_(Caching works only if you use the same instance of AvatarProvider between avatar requests)_

```js
import multiAvatar, { FacebookAvatarProvider, GoogleAvatarProvider } from 'multi-avatar'; // ES6
// or
var multiAvatar = require('multi-avatar'),
  FacebookAvatarProvider = multiAvatar.FacebookAvatarProvider,
  GoogleAvatarProvider = multiAvatar.GoogleAvatarProvider;


// Basic using:
multiAvatar(new FacebookAvatarProvider('100008343750912')) // ID should be always a string, because it can be larger, than Number.MAX_VALUE
  .withSize(64)
  .then(function (avatars) {
    console.log('URL:', avatars.facebook); // URL: https://graph.facebook.com/.../picture?width=64
  });


// Fetching multiple avatars from different providers
multiAvatar([
  new FacebookAvatarProvider('100008343750912'),
  new GoogleAvatarProvider('116933859726289749306')
])
  .withSize(512)
  .then(function (avatars) {
    console.log(avatars);
    // Output:
    // {
    //   facebook: 'https://graph.facebook.com/100008343750912/picture?width=512',
    //   google: 'https://lh3.googleusercontent.com/-t4mT2nC4NkI/AAAAAAAAAAI/AAAAAAAAAAA/4DSxgN3cZmY/s512-c/116933859726289749306.jpg'
    // }
  });


// Fetching several sizes of avatar
multiAvatar([
  new FacebookAvatarProvider('100008343750912')
])
  .withSizes([64, 120]) // Note "s" at the end
  .then(function (avatars) {
    console.log(avatars);
    // Output:
    // {
    //   facebook: {
    //      '64': 'https://graph.facebook.com/100008343750912/picture?width=64',
    //      '120': 'https://graph.facebook.com/100008343750912/picture?width=120'
    //   }
    // }
  });


// Fetching several sizes of avatar from several providers
multiAvatar([
  new FacebookAvatarProvider('100008343750912'),
  new GoogleAvatarProvider('116933859726289749306')
])
  .withSizes([50, 150])
  .then(function (avatars) {
    console.log(avatars);
    // Output:
    // {
    //   facebook: {
    //     '50': 'https://graph.facebook.com/100008343750912/picture?width=50',
    //     '150': 'https://graph.facebook.com/100008343750912/picture?width=150'
    //   },
    //   google: {
    //     '50': 'https://lh3.googleusercontent.com/-t4mT2nC4NkI/AAAAAAAAAAI/AAAAAAAAAAA/4DSxgN3cZmY/s50-c/116933859726289749306.jpg',
    //     '150': 'https://lh3.googleusercontent.com/-t4mT2nC4NkI/AAAAAAAAAAI/AAAAAAAAAAA/4DSxgN3cZmY/s150-c/116933859726289749306.jpg'
    //   }
    // }
  });

  // Error handling:
  multiAvatar(new GoogleAvatarProvider('non_exists_user'))
    .withSize(64)
    .then(function (avatars) {
      console.log(avatars);
      // {
      //   google: null
      // }
    });

```
__NOTE__: *only google and vk can return null, because they
depends on JSON-request, so we can determine,
that user is not exists. Other providers just return
broken image or something like that.*

## Contribute
1. Fork it!
2. Create new branch: `git checkout -b my-new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push it: `git push origin my-new-feature`
5. Submit a pull request!
