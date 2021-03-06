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

    CollectionsServiceBase.getAll = userId => {
      return $http.get('/api/' + userId + '/collections');
    };

    CollectionsServiceBase.create = collection => {
      return $http.post('/api/collections', collection);
    };

    CollectionsServiceBase.get = collectionId => {
      return $http.get('/api/collections/' + collectionId);
    };

    CollectionsServiceBase.merge = (collectionId, newCollectionId) => {
      return $http.put('/api/collections/merge/' + collectionId, newCollectionId);
    };

    CollectionsServiceBase.update = (collectionId, newCollection) => {
      return $http.put('/api/collections/' + collectionId, newCollection);
    };

    CollectionsServiceBase.delete = collectionId => {
      return $http.delete('/api/collections/' + collectionId);
    };

    return CollectionsServiceBase;

  }
}());
