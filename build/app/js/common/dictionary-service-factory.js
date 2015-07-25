'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:DictionaryService
   *
   * @description
   *
   */
  angular.module('common').factory('DictionaryService', DictionaryService);

  function DictionaryService($http) {

    var DictionaryServiceBase = {};

    DictionaryServiceBase.getDefinition = function (mashapeKey, word) {
      return $http.get('https://montanaflynn-dictionary.p.mashape.com/define?word=' + word, {
        headers: { 'X-Mashape-Key': mashapeKey }
      });
    };

    return DictionaryServiceBase;
  }
})();
//# sourceMappingURL=../common/dictionary-service-factory.js.map