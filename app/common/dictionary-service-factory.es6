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
    
    DictionaryServiceBase.getDefinition = (mashapeKey, word) => {
      return $http.get('https://montanaflynn-dictionary.p.mashape.com/define?word=' + word, {
        headers: { 'X-Mashape-Key': mashapeKey }
      });
    };

    // getPronunciation :: string -> string -> Promise(String)
    DictionaryServiceBase.getPronunciation = (forvoKey, word) => {

      let deferred = $q.defer();

      console.log(word);

      $http.jsonp('http://apifree.forvo.com/action/word-pronunciations/format/json/word/' + word + '/language/en/order/rate-desc/limit/1/key/' + forvoKey + '?callback=JSON_CALLBACK')
        .then(res => {
          let pronunciationData = angular.fromJson(res).data;
          console.log(pronunciationData);
          let pronunciationPath = pronunciationData.attributes.total !== 0 ? pronunciationData.items[0].pathmp3 : null;

          deferred.resolve(pronunciationPath);
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
