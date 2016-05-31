'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleAvatarProvider = exports.TwitterAvatarProvider = exports.FacebookAvatarProvider = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (providers) {
  return new MultiAvatar(providers);
};

var _facebook = require('./providers/facebook');

var _facebook2 = _interopRequireDefault(_facebook);

var _twitter = require('./providers/twitter');

var _twitter2 = _interopRequireDefault(_twitter);

var _google = require('./providers/google');

var _google2 = _interopRequireDefault(_google);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports.FacebookAvatarProvider = _facebook2.default;
exports.TwitterAvatarProvider = _twitter2.default;
exports.GoogleAvatarProvider = _google2.default;

var MultiAvatar = function () {
  function MultiAvatar(providers) {
    _classCallCheck(this, MultiAvatar);

    this.providers = Array.isArray(providers) ? providers : [providers];
  }

  _createClass(MultiAvatar, [{
    key: 'requestAll',
    value: function requestAll(size) {
      return Promise.all(this.providers.map(function (provider) {
        return provider.avatar(size);
      }));
    }
  }, {
    key: 'withSize',
    value: function withSize(size) {
      var _this = this;

      return this.requestAll(size).then(function (value) {
        return _this.providers.reduce(function (r, provider, i) {
          r[provider.providerName()] = value[i];
          return r;
        }, {});
      });
    }
  }, {
    key: 'withSizes',
    value: function withSizes(sizes) {
      var _this2 = this;

      var firstSize = sizes[0];
      var firstValue = null;
      return this.requestAll(firstSize).then(function (value) {
        // this required to caching be done, after we can fetch other sizes url from cache
        firstValue = value;
        sizes.shift();
        return Promise.all(sizes.map(function (size) {
          return _this2.requestAll(size);
        }));
      }).then(function (value) {
        sizes.unshift(firstSize);
        value.unshift(firstValue);
        return _this2.providers.reduce(function (r, provider, i) {
          r[provider.providerName()] = value.reduce(function (a, sizeBlock, sizeIndex) {
            a[sizes[sizeIndex]] = sizeBlock[i];
            return a;
          }, {});
          return r;
        }, {});
      });
    }
  }]);

  return MultiAvatar;
}();