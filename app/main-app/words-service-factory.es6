(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name mainApp.factory:WordsService
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .factory('WordsService', WordsService);

  function WordsService($http) {

    let WordsServiceBase = {};

    // every word for this user
    WordsServiceBase.getUserAll = userId => {
      return $http.get('/api/words/all/' + userId);
    };

    // all words for this collection
    WordsServiceBase.getAll = collectionId => {
      return $http.get('/api/' + collectionId + '/words');
    };

    // get only the words to be reviewed today
    WordsServiceBase.getDue = collectionId => {
      return $http.get('/api/'+ collectionId + '/words/?filter=dueToday');
    };

    WordsServiceBase.create = word => {
      return $http.post('/api/words', word);
    };

    WordsServiceBase.get = wordId => {
      return $http.get('/api/words/' + wordId);
    };

    // find :: String -> String -> Promise({word})
    WordsServiceBase.find = (collectionId, wordStr) => {
      return $http.get('/api/' + collectionId + '/words/' + wordStr);
    };

    // find :: String -> String -> Promise({word})
    WordsServiceBase.exists = (collectionId, word) => {
      return $http.get('/api/' + collectionId + '/words/' + word + '/?exists');
    };

    WordsServiceBase.update = (wordId, wordUpdate) => {
      return $http.put('/api/words/' + wordId, wordUpdate);
    };

    WordsServiceBase.delete = wordId => {
      return $http.delete('/api/words/' + wordId);
    };

    return WordsServiceBase;
  }
}());
