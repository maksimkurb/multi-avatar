'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _anyPromise = require('any-promise');

var _anyPromise2 = _interopRequireDefault(_anyPromise);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_nodeFetch2.default.Promise = _anyPromise2.default;

var _class = function () {
  function _class(googleId) {
    _classCallCheck(this, _class);

    this.googleId = googleId;
    this.pictureUrl = null;
  }

  _createClass(_class, [{
    key: 'providerName',
    value: function providerName() {
      return 'google';
    }
  }, {
    key: 'avatar',
    value: function avatar(size) {
      var _this = this;

      return new _anyPromise2.default(function (resolve) {
        if (!_this.googleId) resolve(null);

        if (!_this.pictureUrl) {
          (0, _nodeFetch2.default)('https://picasaweb.google.com/data/entry/api/user/' + _this.googleId + '?alt=json&fields=gphoto:thumbnail').then(function (data) {
            return data.json();
          }).then(function (data) {
            _this.pictureUrl = data.entry.gphoto$thumbnail.$t;
            resolve();
          });
        } else {
          resolve();
        }
      }).then(function () {
        return _this.pictureUrl.replace('s64', 's' + size);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;