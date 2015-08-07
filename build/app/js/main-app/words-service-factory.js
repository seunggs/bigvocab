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

    // every word for this user
    WordsServiceBase.getUserAll = function (userId) {
      return $http.get('/api/words/all/' + userId);
    };

    // all words for this collection
    WordsServiceBase.getAll = function (collectionId) {
      return $http.get('/api/' + collectionId + '/words');
    };

    WordsServiceBase.create = function (word) {
      return $http.post('/api/words', word);
    };

    WordsServiceBase.get = function (wordId) {
      return $http.get('/api/words/' + wordId);
    };

    // find :: String -> String -> Promise({word})
    WordsServiceBase.find = function (collectionId, word) {
      return $http.get('/api/' + collectionId + '/words/' + word);
    };

    // find :: String -> String -> Promise({word})
    WordsServiceBase.exists = function (collectionId, word) {
      return $http.get('/api/' + collectionId + '/words/' + word + '/?exists');
    };

    // get only the words to be reviewed today
    WordsServiceBase.getDue = function (collectionId) {
      return $http.get('/api/' + collectionId + '/words/?filter=dueToday');
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