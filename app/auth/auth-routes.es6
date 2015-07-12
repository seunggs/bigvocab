(() => {
  'use strict';

  angular
    .module('auth')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('auth', {
        url: '/auth',
        templateUrl: 'auth/auth.tpl.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'auth/login.tpl.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'auth/register.tpl.html',
        controller: 'RegisterCtrl',
        controllerAs: 'register'
      });
  }
}());
