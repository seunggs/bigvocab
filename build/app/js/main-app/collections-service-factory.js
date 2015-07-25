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

  function CollectionsService($http) {

    var CollectionsServiceBase = {};

    CollectionsServiceBase.getAll = function () {
      return $http.get('/api/collections');
    };

    CollectionsServiceBase.create = function (collection) {
      return $http.post('/api/collections', collection);
    };

    CollectionsServiceBase.get = function (collectionId) {
      return $http.get('/api/collections/' + collectionId);
    };

    CollectionsServiceBase.update = function (collectionId) {
      return $http.put('/api/collections/' + collectionId);
    };

    CollectionsServiceBase['delete'] = function (collectionId, newCollection) {
      return $http['delete']('/api/collections/' + collectionId, newCollection);
    };

    return CollectionsServiceBase;
  }
})();
//# sourceMappingURL=../main-app/collections-service-factory.js.map