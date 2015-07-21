'use strict';

(function () {
  'use strict';

  angular.module('auth').config(config);

  function config($stateProvider) {
    $stateProvider.state('root.auth', {
      abstract: true,
      views: {
        '': {
          templateUrl: 'auth/auth.tpl.html'
        }
      }
    }).state('root.auth.login', {
      url: '/login',
      templateUrl: 'auth/login.tpl.html',
      controller: 'LoginCtrl',
      controllerAs: 'login'
    }).state('root.auth.register', {
      url: '/register',
      templateUrl: 'auth/register.tpl.html',
      controller: 'RegisterCtrl',
      controllerAs: 'register'
    });
  }
})();
//# sourceMappingURL=../auth/auth-routes.js.map