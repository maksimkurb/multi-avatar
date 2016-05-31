import chai, { should } from 'chai';
import spies from 'chai-spies';
chai.use(spies);
should();

import MultiAvatar, {FacebookAvatarProvider, GoogleAvatarProvider} from '../src/';

describe('Provider', function () {
  describe('#facebook', function () {
    it('should return only facebook picture URL', () => {

      return MultiAvatar([
        new FacebookAvatarProvider(100008343750912)
      ])
      .withSize(64)
      .then(function (value) {
        value.should.have.all.keys(['facebook']);
        value.facebook.should.be.a('string')
          .and.have.string('100008343750912');
      });

    });

    it('should return multiple avatar urls for different sizes', () => {

      return MultiAvatar([
        new FacebookAvatarProvider('100008343750912')
      ])
      .withSizes([64, 128])
      .then(function (value) {
        value.should.have.all.keys(['facebook']);
        value.facebook.should.have.all.keys(['64', '128']);
      });

    });
  });

  const googleAvatarProvider = new GoogleAvatarProvider('116933859726289749306');
  const googleAvatarProviderSpy = chai.spy.on(googleAvatarProvider, 'avatar');
  describe('#google', function() {
    it('should fetch google picture url by API and return avatar successfully', () => {
      this.timeout(5000);

      return MultiAvatar([
        googleAvatarProvider
      ])
      .withSize(256)
      .then(function (value) {
        value.should.have.all.keys(['google']);
        value.google.should.be.a('string')
          .and.have.string('s256');
        googleAvatarProviderSpy.should.have.been.called.once();
      });

    });

    it('should contain cached url', () => {
      googleAvatarProvider.should.have.property('pictureUrl');
      googleAvatarProvider.pictureUrl.should.be.a('string')
        .and.have.string('s64');
    });

    it('should return avatar by url in cache immediately', () => {
      this.timeout(50);

      return MultiAvatar([
        googleAvatarProvider
      ])
      .withSize(512)
      .then(function (value) {
        value.should.have.all.keys(['google']);
        value.google.should.be.a('string')
          .and.have.string('s512');
      });

    });

    it('should return multiple pictures in the same time (or less) as it fetching url from API first time', () => {
      return MultiAvatar([
        new GoogleAvatarProvider('116933859726289749306')
      ])
      .withSizes([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
      .then(function (value) {
        value.should.have.all.keys(['google']);
        value.google.should.have.all.keys(['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']);

      })
    });

  });


});
