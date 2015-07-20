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
    
    return DictionaryServiceBase;

  }
}());
