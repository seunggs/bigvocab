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

    CollectionsServiceBase.get = collectionId => {
      return $http.get('/api/collections');
    };

    return CollectionsServiceBase;

  }
}());
