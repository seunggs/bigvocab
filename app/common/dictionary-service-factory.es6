(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:DictionaryService
   *
   * @description
   *
   */
  angular
    .module('common')
    .factory('DictionaryService', DictionaryService);

  function DictionaryService($http, $q) {

    let DictionaryServiceBase = {};
    
    DictionaryServiceBase.getDefinitionFree = (mashapeKey, wordStr) => {
      return $http.get('https://montanaflynn-dictionary.p.mashape.com/define?word=' + wordStr, {
        headers: { 'X-Mashape-Key': mashapeKey }
      });
    };

    // getPronunciation :: String -> Promise([a])
    DictionaryServiceBase.getPronunciationMw = word => {
      return $http.get('/api/pronunciations/' + word);
    };

    // getPronunciation :: String -> String -> Promise([a])
    DictionaryServiceBase.updatePronunciationMw = wordObj => {
      return $http.put('/api/pronunciations/' + wordObj.id, wordObj);
    };

    // getPronunciation :: string -> string -> Promise([a])
    DictionaryServiceBase.getPronunciationForvo = (forvoKey, word) => {

      let deferred = $q.defer();

      $http.jsonp('http://apifree.forvo.com/action/word-pronunciations/format/json/word/' + word + '/language/en/order/rate-desc/limit/1/key/' + forvoKey + '?callback=JSON_CALLBACK')
        .then(res => {
          let pronunciationData = angular.fromJson(res).data;
          let pronunciationPaths;

          if (pronunciationData.attributes.total !== 0) {
            pronunciationPaths = pronunciationPaths.push(pronunciationData.items[0].pathmp3);
          } else {
            pronunciationPaths = null;
          }

          deferred.resolve(pronunciationPaths);
        })
        .catch(err => {
          deferred.reject(err);
          console.log('Something went wrong: ', err);
        });

      return deferred.promise;

    };
    
    return DictionaryServiceBase;

  }
}());
