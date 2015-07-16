(() => {
  'use strict';

  angular.module('ramda', []);
  angular.module('ramda').factory('R', function ($window) {
      return $window.R;
  });

  /* @ngdoc object
   * @name bigvocab
   * @description
   *
   */
  angular
    .module('bigvocab', [
      'ngAria',
      'ui.router',
      'home',
      'auth',
      'mainApp',
      'ramda'
    ]);
}());
