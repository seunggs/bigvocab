(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:Sm2Service
   *
   * @description
   *
   */
  angular
    .module('common')
    .factory('Sm2Service', Sm2Service);

  function Sm2Service($moment) {
    let Sm2ServiceBase = {};

    // SM2 (Super Memo 2) Algorithm

    // Learning phase: 1min / 10min
    // Review phase default: 4 days
    // I(n) = I(n-1) * EF

    // Review response:
    // Again: reset phase to learning + -20% to EF
    // Hard: -15% to EF
    // Good: do nothing
    // Easy: +15% to EF

    // main //////////////////////////////////////////////////////////////////////////////

    // calcEaseFactor :: Float -> String -> Float
    Sm2ServiceBase.calcEaseFactor = (easeFactor, choice) => {
      let oldEaseFactor = easeFactor;
      let newEaseFactor;

      switch (choice) {
        case 'again':
          newEaseFactor = oldEaseFactor - 0.2;
          break;
        case 'hard':
          newEaseFactor = oldEaseFactor - 0.15;
          break;
        case 'good':
          newEaseFactor = oldEaseFactor;
          break;
        case 'easy':
          newEaseFactor = oldEaseFactor + 0.15;
          break;
      }

      return newEaseFactor;
    };

    // calcPhase :: String -> Integer -> String -> String
    Sm2ServiceBase.calcPhase = (phase, interval, choice) => {
      if (choice === 'again') {
        return 'learning';
      }

      if (phase === 'learning') {
        if  (interval === 1) {
          return 'learning';
        } else if (interval === 10) {
          return 'review';
        }
      }

      if (phase === 'review') {
        return 'review';
      }
    };

    // calcInterval :: String -> Integer -> Float -> String -> Integer
    // note: interval is in minutes
    Sm2ServiceBase.calcInterval = (phase, interval, easeFactor, choice) => {
      if (choice === 'again') {
        return 1;
      }

      if (phase === 'learning') {
        switch (interval) {
          case 1:
            return 10;
          case 10:
            return 4 * 24 * 60;
        }
      } else if (phase === 'review') {
        return interval * easeFactor;
      }
    };

    Sm2ServiceBase.calcNextReview = (newInterval) => {
      return $moment().add(newInterval, 'minutes');
    };

    return Sm2ServiceBase;
  }
}());
