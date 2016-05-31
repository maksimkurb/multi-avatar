'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _anyPromise = require('any-promise');

var _anyPromise2 = _interopRequireDefault(_anyPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(facebookId) {
    _classCallCheck(this, _class);

    this.facebookId = facebookId;
  }

  _createClass(_class, [{
    key: 'providerName',
    value: function providerName() {
      return 'facebook';
    }
  }, {
    key: 'avatar',
    value: function avatar(size) {
      var _this = this;

      return new _anyPromise2.default(function (resolve) {
        if (!_this.facebookId) resolve(null);

        resolve('https://graph.facebook.com/' + _this.facebookId + '/picture?width=' + size);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;