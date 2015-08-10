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
    
    DictionaryServiceBase.getDefinitionFree = (mashapeKey, word) => {
      return $http.get('https://montanaflynn-dictionary.p.mashape.com/define?word=' + word, {
        headers: { 'X-Mashape-Key': mashapeKey }
      });
    };

    // getPronunciation :: String -> Promise([a])
    DictionaryServiceBase.getPronunciationMw = word => {
      return $http.get('/pronunciations/' + word);
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
