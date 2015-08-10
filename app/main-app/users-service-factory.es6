(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name mainApp.factory:UsersService
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .factory('UsersService', UsersService);

  function UsersService($http) {

    let UsersServiceBase = {};

    UsersServiceBase.update = (userId, updateObj) => {
    	return $http.put('/api/users/' + userId, updateObj);
    };

    return UsersServiceBase;
  }
}());
