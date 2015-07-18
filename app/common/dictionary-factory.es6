(() => {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:Dictionary
   *
   * @description
   *
   */
  angular
    .module('common')
    .factory('Dictionary', Dictionary);

  function Dictionary($http) {

    let DictionaryBase = {};
    
    DictionaryBase.getDefinition = (mashapeKey, word) => {
      return $http.get('https://montanaflynn-dictionary.p.mashape.com/define?word=' + word, {
        headers: { 'X-Mashape-Key': mashapeKey }
      });
    };
    
    return DictionaryBase;

  }
}());
