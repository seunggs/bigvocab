/*global describe, beforeEach, afterEach, jasmine, it, expect, inject, module*/
'use strict';

describe('Sm2Service', function () {
  var factory = undefined;

  beforeEach(module('common', 'angular-momentjs'));

  beforeEach(inject(function (Sm2Service) {
    factory = Sm2Service;
  }));

  describe('calcEaseFactor', function () {
    it('should return a correct ease factor value based on each choice', function () {
      var currentEaseFactor = 2.5;
      var choices = ['again', 'hard', 'good', 'easy'];
      var newEaseFactors = [2.3, 2.35, 2.5, 2.65];

      choices.forEach(function (choice, index) {
        expect(factory.calcEaseFactor(currentEaseFactor, choice)).toEqual(newEaseFactors[index]);
      });
    });

    it('should return minimum value (1.3) if the new ease factor is expected to be lower than that', function () {
      var currentEaseFactor = 1.35;
      var choice = 'again';
      expect(factory.calcEaseFactor(currentEaseFactor, choice)).toEqual(1.3);
    });
  });

  describe('calcPhase', function () {
    var currentPhase = undefined,
        interval = undefined,
        choice = undefined;

    it('should ALWAYS return learning phase if again is chosen', function () {
      currentPhase = 'learning';
      interval = 10;
      choice = 'again';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('learning');

      currentPhase = 'review';
      interval = 4 * 24 * 60;
      choice = 'again';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('learning');
    });

    it('should ALWAYS return review phase if easy is chosen', function () {
      currentPhase = 'learning';
      interval = 1;
      choice = 'easy';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('review');

      currentPhase = 'learning';
      interval = 10;
      choice = 'easy';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('review');

      currentPhase = 'review';
      interval = 4 * 24 * 60;
      choice = 'easy';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('review');
    });

    it('should return learning phase if interval is 1 and neither again nor easy is chosen', function () {
      currentPhase = 'learning';
      interval = 1;
      choice = 'good';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('learning');
    });

    it('should return review phase if interval is 10 and neither again nor easy is chosen', function () {
      currentPhase = 'learning';
      interval = 10;
      choice = 'good';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('review');
    });

    it('should return review phase if interval is greater than 10 and neither again nor easy is chosen', function () {
      currentPhase = 'review';
      interval = 4 * 24 * 60;
      choice = 'good';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('review');
    });
  });

  describe('calcInterval', function () {
    var currentPhase = undefined,
        interval = undefined,
        easeFactor = undefined,
        choice = undefined;

    it('should ALWAYS return 1 if again is chosen', function () {
      currentPhase = 'learning';
      interval = 10;
      easeFactor = 2.5;
      choice = 'again';
      expect(factory.calcInterval(currentPhase, interval, easeFactor, choice)).toEqual(1);

      currentPhase = 'review';
      interval = 4 * 24 * 60;
      easeFactor = 2.5;
      choice = 'again';
      expect(factory.calcInterval(currentPhase, interval, easeFactor, choice)).toEqual(1);
    });

    it('should ALWAYS return 4 * 24 * 60 (4 days in minutes) if easy is chosen and current phase is learning', function () {
      currentPhase = 'learning';
      interval = 1;
      easeFactor = 2.5;
      choice = 'easy';
      expect(factory.calcInterval(currentPhase, interval, easeFactor, choice)).toEqual(4 * 24 * 60);
    });

    it('should return 10 if phase is learning and interval is 1 and neither again or easy is chosen', function () {
      currentPhase = 'learning';
      interval = 1;
      easeFactor = 2.5;
      choice = 'good';
      expect(factory.calcInterval(currentPhase, interval, easeFactor, choice)).toEqual(10);
    });

    it('should return 4 * 24 * 60 (4 days in minutes) if phase is learning and interval is 10 and neither again or easy is chosen', function () {
      currentPhase = 'learning';
      interval = 10;
      easeFactor = 2.5;
      choice = 'good';
      expect(factory.calcInterval(currentPhase, interval, easeFactor, choice)).toEqual(4 * 24 * 60);
    });

    it('should return interval * easeFactor if phase is review and again is NOT chosen', function () {
      currentPhase = 'review';
      interval = 4 * 24 * 60;
      easeFactor = 2.5;
      choice = 'good';
      expect(factory.calcInterval(currentPhase, interval, easeFactor, choice)).toEqual(interval * easeFactor);
    });
  });

  describe('calcNextReview', function () {
    var newInterval = undefined,
        momentMock = undefined;

    beforeEach(inject(function ($moment) {
      momentMock = $moment;
    }));

    it('should return the time of 10 minutes from now if the new interval is 10', function () {
      newInterval = 10;
      console.log(momentMock().add(10, 'minutes'));
      expect(factory.calcNextReview(newInterval)).toEqual(momentMock().add(10, 'minutes'));
    });
  });
});