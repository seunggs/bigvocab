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

    // get only the words to be reviewed today
    WordsServiceBase.getDue = function (collectionId) {
      return $http.get('/api/words/' + collectionId + '/?filter=dueToday');
    };

    // getCount :: String -> Integer
    WordsServiceBase.getCount = function (collectionId) {
      return $http.get('/api/words/count/' + collectionId);
    };

    // getDueCount :: String -> Integer
    WordsServiceBase.getDueCount = function (collectionId) {
      return $http.get('/api/words/count/' + collectionId + '/?filter=dueToday');
    };

    WordsServiceBase.update = function (wordId, wordUpdate) {
      return $http.put('/api/words/' + wordId, wordUpdate);
    };

    WordsServiceBase['delete'] = function (wordId) {
      return $http['delete']('/api/words/' + wordId);
    };

    return WordsServiceBase;
  }
})();
//# sourceMappingURL=../main-app/words-service-factory.js.map