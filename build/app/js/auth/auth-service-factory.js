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

  function AuthService(ConfigService, $http, $q, $window) {

    var AuthServiceBase = {};

    // only check login status
    // used in nav
    AuthServiceBase.isLoggedIn = function () {
      return $http.get('/auth/loggedin');
    };

    // check login status and redirect if not logged in
    // used for route resolve for protected paths
    AuthServiceBase.checkLoggedIn = function () {

      var deferred = $q.defer();

      $http.get('/auth/loggedin').then(function (user) {
        var user = user.data;
        if (user !== false) {
          deferred.resolve(user.new_val);
        } else {
          deferred.reject();
          $window.location = '/#/login';
        }
      })['catch'](function (err) {
        deferred.reject();
        $window.location = '/#/';
        console.log('Something went wrong: ', err);
      });

      return deferred.promise;
    };

    AuthServiceBase.logout = function () {
      return $http.get('/auth/logout');
    };

    return AuthServiceBase;
  }
})();
//# sourceMappingURL=../auth/auth-service-factory.js.map