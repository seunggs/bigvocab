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

    WordsServiceBase.getAll = collectionId => {
      return $http.get('/api/words/' + collectionId);
    };

    WordsServiceBase.create = word => {
      return $http.post('/api/words', word);
    };

    WordsServiceBase.get = wordId => {
      return $http.get('/api/words/' + wordId);
    };

    // get only the words to be reviewed today
    WordsServiceBase.getDue = collectionId => {
      return $http.get('/api/words/' + collectionId + '/?filter=dueToday');
    };

    WordsServiceBase.update = (wordId, wordUpdate) => {
      console.log(wordId);
      return $http.put('/api/words/' + wordId, wordUpdate);
    };

    WordsServiceBase.delete = wordId => {
      return $http.delete('/api/words/' + wordId);
    };

    return WordsServiceBase;
  }
}());
