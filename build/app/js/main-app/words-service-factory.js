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

    // get only the words to be reviewed today
    WordsServiceBase.getDue = function (collectionId) {
      return $http.get('/api/' + collectionId + '/words/?filter=dueToday');
    };

    WordsServiceBase.create = function (wordObj) {
      return $http.post('/api/words', wordObj);
    };

    WordsServiceBase.get = function (wordId) {
      return $http.get('/api/words/' + wordId);
    };

    // find :: String -> String -> Promise({word})
    WordsServiceBase.find = function (collectionId, wordStr) {
      return $http.get('/api/' + collectionId + '/words/' + wordStr);
    };

    // find :: String -> String -> Promise({word})
    WordsServiceBase.exists = function (collectionId, wordStr) {
      return $http.get('/api/' + collectionId + '/words/' + wordStr + '/?exists');
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