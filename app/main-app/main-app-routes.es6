(() => {
  'use strict';

  angular
    .module('mainApp')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('mainApp', {
        url: '/main-app',
        templateUrl: 'main-app/main-app.tpl.html',
        controller: 'MainAppCtrl',
        controllerAs: 'mainApp'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: 'main-app/dashboard.tpl.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard'
      });
  }
}());
