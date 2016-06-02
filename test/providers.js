import chai, { expect } from 'chai';
import spies from 'chai-spies';
chai.use(spies);

import multiAvatar, { FacebookAvatarProvider, GoogleAvatarProvider, VkAvatarProvider} from '../src/';

describe('Provider', function () {
  describe('#facebook', function () {
    it('should return only facebook picture URL', function() {
      return multiAvatar([
        new FacebookAvatarProvider('100008343750912')
      ])
      .withSize(64)
      .then(function (value) {
        expect(value).to.have.all.keys(['facebook']);
        expect(value.facebook).to.be.a('string')
          .and.have.string('100008343750912');
      });
    });

    it('should return multiple avatar urls for different sizes', () => {
      return multiAvatar([
        new FacebookAvatarProvider('100008343750912')
      ])
      .withSizes([64, 128])
      .then(function (value) {
        expect(value).to.have.all.keys(['facebook']);
        expect(value.facebook).to.have.all.keys(['64', '128']);
      });
    });
  });


  describe('#google', function () {
    const googleAvatarProvider = new GoogleAvatarProvider('116933859726289749306');
    const googleAvatarProviderSpy = chai.spy.on(googleAvatarProvider, 'avatar');

    it('should fetch google picture url by API and return avatar successfully', () => {
      this.timeout(5000);

      return multiAvatar([
        googleAvatarProvider
      ])
      .withSize(256)
      .then(function (value) {
        expect(value).to.have.all.keys(['google']);
        expect(value.google).to.be.a('string')
          .and.have.string('s256');
        expect(googleAvatarProviderSpy).to.have.been.called.once();
      });
    });

    it('should contain cached url', () => {
      expect(googleAvatarProvider).to.have.property('pictureUrl');
      expect(googleAvatarProvider.pictureUrl).to.be.a('string')
        .and.have.string('s64');
    });

    it('should return avatar by url in cache immediately', () => {
      this.timeout(50);

      return multiAvatar([
        googleAvatarProvider
      ])
      .withSize(512)
      .then(function (value) {
        expect(value).to.have.all.keys(['google']);
        expect(value.google).to.be.a('string')
          .and.have.string('s512');
      });
    });

    it('should return multiple pictures in the same time (or less) as it fetching url from API first time', () => {
      return multiAvatar([
        new GoogleAvatarProvider('116933859726289749306')
      ])
      .withSizes([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
      .then(function (value) {
        expect(value).to.have.all.keys(['google']);
        expect(value.google).to.have.all.keys(['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']);
      });
    });



    it('should return null, if user is not exists', () => {
      return multiAvatar([
        new GoogleAvatarProvider('notexists'),
        new FacebookAvatarProvider('100008343750912')
      ])
      .withSize(50)
      .then(function (value) {
        expect(value).to.have.all.keys(['google', 'facebook']);
        expect(value.google).to.be.null;

      })
    });

  });

  describe('#vk', function () {
    const vkAvatarProvider = new VkAvatarProvider('1');
    const vkAvatarProviderSpy = chai.spy.on(vkAvatarProvider, 'avatar');

    it('should fetch vk picture url by API and return avatar successfully', () => {
      this.timeout(5000);

      return multiAvatar([
        vkAvatarProvider
      ])
      .withSize(256)
      .then(function (value) {
        expect(value).to.have.all.keys(['vk']);
        expect(value.vk).to.be.a('string')
          .and.have.string('http');
        expect(vkAvatarProviderSpy).to.have.been.called.once();
      });
    });

    it('should contain cached urls', () => {
      expect(vkAvatarProvider).to.have.property('pictureUrls');
      expect(vkAvatarProvider.pictureUrls).to.be.a('array');
    });

    it('should return avatar by url in cache immediately', () => {
      this.timeout(50);

      return multiAvatar([
        vkAvatarProvider
      ])
      .withSize(512)
      .then(function (value) {
        expect(value).to.have.all.keys(['vk']);
        expect(value.vk).to.be.a('string')
          .and.have.string('http');
      });
    });

    it('should return multiple pictures in the same time (or less) as it fetching url from API first time', () => {
      return multiAvatar([
        new VkAvatarProvider('1')
      ])
      .withSizes([10, 20, 30, 40, 50, 60, 70, 80, 90, 100])
      .then(function (value) {
        expect(value).to.have.all.keys(['vk']);
        expect(value.vk).to.have.all.keys(['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']);
      })
    });


  })

});
