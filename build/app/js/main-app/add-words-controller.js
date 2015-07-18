'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var AddWordsCtrl = function AddWordsCtrl(Config, Dictionary) {
    _classCallCheck(this, AddWordsCtrl);

    var vm = this;

    vm.wordPlaceholder = 'i.e. audacious';
    vm.definitionPlaceholder = 'i.e. Fearlessly, often recklessly daring; bold. See Synonyms at adventurous, brave.';

    vm.getDefinition = function (word) {
      if (word !== undefined) {
        Dictionary.getDefinition(Config.mashapeKey, word).then(function (res) {
          vm.definitions = res.data.definitions;
        });
      }
    };

    vm.copyDefinition = function (definition) {
      vm.definition = definition;
    };
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:AddWordsCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('AddWordsCtrl', AddWordsCtrl);
})();
//# sourceMappingURL=../main-app/add-words-controller.js.map