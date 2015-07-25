(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name auth.factory:AuthService
   *
   * @description
   *
   */
  angular
    .module('auth')
    .factory('AuthService', AuthService);

  function AuthService(ConfigService, $http, $q, $window) {

    let AuthServiceBase = {};

    // only check login status
    // used in nav
    AuthServiceBase.isLoggedIn = () => {
      return $http.get('/auth/loggedin');
    };

    // check login status and redirect if not logged in
    // used for route resolve for protected paths
    AuthServiceBase.checkLoggedIn = () => {

      var deferred = $q.defer();

      $http.get('/auth/loggedin')
        .then(user => {
          var user = angular.fromJson(user).data;
          if (user !== false) {
            deferred.resolve(user);
          } else {
            deferred.reject();
            $window.location = '/#/login';
          }
        })
        .catch(err => {
          deferred.reject();
          $window.location = '/#/';
          console.log('Something went wrong: ', err);
        });

      return deferred.promise;
      
    };

    AuthServiceBase.logout = () => {
      return $http.get('/auth/logout');
    };
    
    return AuthServiceBase;

  }
}());
