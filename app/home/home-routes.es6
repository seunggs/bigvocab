(() => {
  'use strict';

  angular
    .module('home')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/home.tpl.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .state('nav', {
        url: '/nav',
        templateUrl: 'home/nav.tpl.html',
        controller: 'NavCtrl',
        controllerAs: 'nav'
      })
      .state('nav-home', {
        url: '/nav-home',
        templateUrl: 'home/nav-home.tpl.html',
        controller: 'NavHomeCtrl',
        controllerAs: 'navHome'
      });
  }
}());
