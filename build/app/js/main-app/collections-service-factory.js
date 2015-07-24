'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name mainApp.factory:CollectionsService
   *
   * @description
   *
   */
  angular.module('mainApp').factory('CollectionsService', CollectionsService);

  function CollectionsService(ConfigService, $http) {

    var CollectionsServiceBase = {};

    CollectionsServiceBase.getAll = function () {
      return $http.get(ConfigService.appUrl + '/api/collections');
    };

    CollectionsServiceBase.create = function (collection) {
      return $http.post(ConfigService.appUrl + '/api/collections', collection);
    };

    CollectionsServiceBase.get = function (collectionId) {
      return $http.get(ConfigService.appUrl + '/api/collections/' + collectionId);
    };

    CollectionsServiceBase.update = function (collectionId) {
      return $http.put(ConfigService.appUrl + '/api/collections/' + collectionId);
    };

    CollectionsServiceBase['delete'] = function (collectionId, newCollection) {
      return $http['delete'](ConfigService.appUrl + '/api/collections/' + collectionId, newCollection);
    };

    return CollectionsServiceBase;
  }
})();
//# sourceMappingURL=../main-app/collections-service-factory.js.map