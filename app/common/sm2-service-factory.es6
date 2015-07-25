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

  function Sm2Service() {
    let Sm2ServiceBase = {};

    // SM2 (Super Memo 2) Algorithm

    // Learning phase: 1min / 10min
    // Review phase default: 4 days
    // I(n) = I(n-1) * EF

    // Review response:
    // Again: reset to learning + -20% to EF
    // Hard: -15% to EF
    // Good: do nothing
    // Easy: +15% to EF

    Sm2ServiceBase.someMethod = () => {
      return 'Sm2Service';
    };

    return Sm2ServiceBase;
  }
}());
