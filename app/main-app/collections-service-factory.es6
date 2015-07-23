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

  function CollectionsService($http) {

    let CollectionsServiceBase = {};

    CollectionsServiceBase.getAll = () => {
      return $http.get('/api/collections');
    };

    CollectionsServiceBase.create = (collection) => {
      return $http.post('/api/collections', collection);
    };

    CollectionsServiceBase.get = (collectionId) => {
      return $http.get('/api/collections/' + collectionId);
    };

    CollectionsServiceBase.update = (collectionId) => {
      return $http.put('/api/collections/' + collectionId);
    };

    CollectionsServiceBase.delete = (collectionId, newCollection) => {
      return $http.delete('/api/collections/' + collectionId, newCollection);
    };

    return CollectionsServiceBase;

  }
}());
