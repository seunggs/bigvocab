(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:ImportService
   *
   * @description
   *
   */
  angular
    .module('common')
    .factory('ImportService', ImportService);

  function ImportService() {
    let ImportServiceBase = {};

    // anki :: String -> { collectionTitle, [files] } -> {dbRes}
    ImportServiceBase.anki = (userId, data) => {
      return $http.post('/import/anki/' + userId, data);
    };

    return ImportServiceBase;
  }
}());
