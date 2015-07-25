'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name mainApp.factory:WordsService
   *
   * @description
   *
   */
  angular.module('mainApp').factory('WordsService', WordsService);

  function WordsService($http) {

    var WordsServiceBase = {};

    WordsServiceBase.getAll = function (collectionId) {
      return $http.get('/api/words/' + collectionId);
    };

    WordsServiceBase.create = function (word) {
      return $http.post('/api/words', word);
    };

    WordsServiceBase.get = function (wordId) {
      return $http.get('/api/words/' + wordId);
    };

    WordsServiceBase.update = function (wordId, word) {
      return $http.put('/api/words/' + wordId, word);
    };

    WordsServiceBase['delete'] = function (wordId) {
      return $http['delete']('/api/words/' + wordId);
    };

    return WordsServiceBase;
  }
})();
//# sourceMappingURL=../main-app/words-service-factory.js.map