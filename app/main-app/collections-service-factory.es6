(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name mainApp.factory:CollectionsService
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .factory('CollectionsService', CollectionsService);

  function CollectionsService(ConfigService, $http) {

    let CollectionsServiceBase = {};

    CollectionsServiceBase.getAll = () => {
      return $http.get(ConfigService.appUrl + '/api/collections');
    };

    CollectionsServiceBase.create = collection => {
      console.log(collection);
      return $http.post(ConfigService.appUrl + '/api/collections', collection);
    };

    CollectionsServiceBase.get = collectionId => {
      return $http.get(ConfigService.appUrl + '/api/collections/' + collectionId);
    };

    CollectionsServiceBase.update = collectionId => {
      return $http.put(ConfigService.appUrl + '/api/collections/' + collectionId);
    };

    CollectionsServiceBase.delete = (collectionId, newCollection) => {
      return $http.delete(ConfigService.appUrl + '/api/collections/' + collectionId, newCollection);
    };

    return CollectionsServiceBase;

  }
}());
