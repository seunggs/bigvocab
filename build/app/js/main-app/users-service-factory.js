'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name mainApp.factory:UsersService
   *
   * @description
   *
   */
  angular.module('mainApp').factory('UsersService', UsersService);

  function UsersService($http) {

    var UsersServiceBase = {};

    UsersServiceBase.update = function (userId, updateObj) {
      return $http.put('/api/users/' + userId, updateObj);
    };

    return UsersServiceBase;
  }
})();
//# sourceMappingURL=../main-app/users-service-factory.js.map