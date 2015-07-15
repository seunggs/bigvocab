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
      'ui.router',
      'home',
      'auth',
      'mainApp'
    ]);
}());
