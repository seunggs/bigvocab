'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name auth.factory:AuthService
   *
   * @description
   *
   */
  angular.module('auth').factory('AuthService', AuthService);

  function AuthService(ConfigService, $http, $q, $location) {

    var AuthServiceBase = {};

    AuthServiceBase.checkLoggedIn = function () {
      $http.get(ConfigService.appUrl + '/auth/loggedin').then(function (user) {
        if (user !== false) {
          deferred.resolve();
        } else {
          deferred.reject();
          $location.url('/login');
        }
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
      });
    };

    return AuthServiceBase;
  }
})();
//# sourceMappingURL=../auth/auth-service-factory.js.map