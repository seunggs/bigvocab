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

    CollectionsServiceBase.get = function (collectionId) {
      return $http.get('/api/collections');
    };

    return CollectionsServiceBase;
  }
})();
//# sourceMappingURL=../main-app/collections-service-factory.js.map