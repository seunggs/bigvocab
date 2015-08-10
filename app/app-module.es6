(() => {
  'use strict';

  /* @ngdoc object
   * @name bigvocab
   * @description
   *
   */
  angular
    .module('bigvocab', [
      'ngAria',
      'ngAnimate',
      'ngMessages',
      'ui.router',
      '720kb.tooltips',
      'ngAudio',
      'angular-momentjs',
      'cb.x2js',
      'home',
      'auth',
      'mainApp',
      // 'ramda',
      'common'
    ]);

  // ramda module
  // angular.module('ramda', []);
  // angular.module('ramda').factory('R', function ($window) {
  //   return $window.R;
  // });

}());
