'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name common.factory:Dictionary
   *
   * @description
   *
   */
  angular.module('common').factory('Dictionary', Dictionary);

  function Dictionary($http) {

    var DictionaryBase = {};

    DictionaryBase.getDefinition = function (mashapeKey, word) {
      return $http.get('https://montanaflynn-dictionary.p.mashape.com/define?word=' + word, {
        headers: { 'X-Mashape-Key': mashapeKey }
      });
    };

    return DictionaryBase;
  }
})();
//# sourceMappingURL=../common/dictionary-factory.js.map