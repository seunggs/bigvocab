'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:ImportService
   *
   * @description
   *
   */
  angular.module('common').factory('ImportService', ImportService);

  function ImportService($http) {
    var ImportServiceBase = {};

    // anki :: String -> { collectionTitle, [files] } -> {dbRes}
    ImportServiceBase.anki = function (userId, data) {
      return $http.post('/api/import/anki/' + userId, data);
    };

    return ImportServiceBase;
  }
})();
//# sourceMappingURL=../common/import-service-factory.js.map