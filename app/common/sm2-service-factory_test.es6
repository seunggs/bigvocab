/*global describe, beforeEach, afterEach, jasmine, it, expect, inject, module*/
'use strict';

describe('Sm2Service', () => {
  let factory;

  beforeEach(module('common', 'angular-momentjs'));

  beforeEach(inject((Sm2Service) => {
    factory = Sm2Service;
  }));

  describe('calcEaseFactor', () => {
    it('should return a correct ease factor value based on each choice', () => {
      let currentEaseFactor = 2.5;
      let choices = ['again', 'hard', 'good', 'easy'];
      let newEaseFactors = [2.3, 2.35, 2.5, 2.65];

      choices.forEach((choice, index) => {
        expect(factory.calcEaseFactor(currentEaseFactor, choice)).toEqual(newEaseFactors[index]);
      });
    });

    it('should return minimum value (1.3) if the new ease factor is expected to be lower than that', () => {
      let currentEaseFactor = 1.35;
      let choice = 'again';
      expect(factory.calcEaseFactor(currentEaseFactor, choice)).toEqual(1.3);
    });
  });

  describe('calcPhase', () => {
    let currentPhase, interval, choice;

    it('should ALWAYS return learning phase if again is chosen', () => {
      currentPhase = 'learning';
      interval = 10;
      choice = 'again';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('learning');

      currentPhase = 'review';
      interval = 4 * 24 * 60;
      choice = 'again';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('learning');
    });

    it('should ALWAYS return review phase if easy is chosen', () => {
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

    it('should return learning phase if interval is 1 and neither again nor easy is chosen', () => {
      currentPhase = 'learning';
      interval = 1;
      choice = 'good';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('learning');
    });

    it('should return review phase if interval is 10 and neither again nor easy is chosen', () => {
      currentPhase = 'learning';
      interval = 10;
      choice = 'good';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('review');
    });

    it('should return review phase if interval is greater than 10 and neither again nor easy is chosen', () => {
      currentPhase = 'review';
      interval = 4 * 24 * 60;
      choice = 'good';
      expect(factory.calcPhase(currentPhase, interval, choice)).toEqual('review');
    });
  });

  describe('calcInterval', () => {
    let currentPhase, interval, easeFactor, choice;

    it('should ALWAYS return 1 if again is chosen', () => {
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

    it('should ALWAYS return 4 * 24 * 60 (4 days in minutes) if easy is chosen and current phase is learning', () => {
      currentPhase = 'learning';
      interval = 1;
      easeFactor = 2.5;
      choice = 'easy';
      expect(factory.calcInterval(currentPhase, interval, easeFactor, choice)).toEqual(4 * 24 * 60);
    });

    it('should return 10 if phase is learning and interval is 1 and neither again or easy is chosen', () => {
      currentPhase = 'learning';
      interval = 1;
      easeFactor = 2.5;
      choice = 'good';
      expect(factory.calcInterval(currentPhase, interval, easeFactor, choice)).toEqual(10);
    });

    it('should return 4 * 24 * 60 (4 days in minutes) if phase is learning and interval is 10 and neither again or easy is chosen', () => {
      currentPhase = 'learning';
      interval = 10;
      easeFactor = 2.5;
      choice = 'good';
      expect(factory.calcInterval(currentPhase, interval, easeFactor, choice)).toEqual(4 * 24 * 60);
    });

    it('should return interval * easeFactor if phase is review and again is NOT chosen', () => {
      currentPhase = 'review';
      interval = 4 * 24 * 60;
      easeFactor = 2.5;
      choice = 'good';
      expect(factory.calcInterval(currentPhase, interval, easeFactor, choice)).toEqual(interval * easeFactor);
    });
  });

  describe('calcNextReview', () => {
    let newInterval, momentMock;

    beforeEach(inject(($moment) => {
      momentMock = $moment;
    }));

    it('should return the time of 10 minutes from now if the new interval is 10', () => {
      newInterval = 10;
      console.log(momentMock().add(10, 'minutes'));
      expect(factory.calcNextReview(newInterval)).toEqual(momentMock().add(10, 'minutes'));
    });
  });
  

});
