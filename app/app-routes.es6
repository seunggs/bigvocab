(() => {
  'use strict';

  angular
    .module('bigvocab')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());
