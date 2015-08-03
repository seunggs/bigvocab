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

  function DictionaryService($http) {

    let DictionaryServiceBase = {};
    
    DictionaryServiceBase.getDefinition = (mashapeKey, word) => {
      return $http.get('https://montanaflynn-dictionary.p.mashape.com/define?word=' + word, {
        headers: { 'X-Mashape-Key': mashapeKey }
      });
    };

    DictionaryServiceBase.getPronunciation = (forvoKey, word) => {
      return $http.jsonp('http://apifree.forvo.com/action/word-pronunciations/format/json/word/' + word + '/language/en/order/rate-desc/limit/1/key/' + forvoKey + '?callback=JSON_CALLBACK');
    };
    
    return DictionaryServiceBase;

  }
}());
