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

  function AuthService(ConfigService, $http, $q, $location) {

    let AuthServiceBase = {};

    AuthServiceBase.checkLoggedIn = () => {
      $http.get(ConfigService.appUrl + '/auth/loggedin')
        .then(user => {
          if (user !== false) {
            deferred.resolve();
          } else {
            deferred.reject();
            $location.url('/login');
          }
        })
        .catch(err => {
          console.log('Something went wrong: ', err);
        });
    }

    return AuthServiceBase;

  }
}());
