'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var AddWordsCtrl = function AddWordsCtrl(ConfigService, DictionaryService) {
    _classCallCheck(this, AddWordsCtrl);

    var vm = this;

    vm.formData = {};
    vm.placeholder = {
      word: 'i.e. audacious',
      definition: 'i.e. Fearlessly, often recklessly daring; bold. See Synonyms at adventurous, brave.'
    };
    vm.btnState = {
      loading: false,
      success: false
    };

    vm.getDefinition = function (word) {
      if (word !== undefined) {
        DictionaryService.getDefinition(ConfigService.mashapeKey, word).then(function (res) {
          vm.definitions = res.data.definitions;
        });
      }
    };

    vm.copyDefinition = function (definition) {
      vm.definition = definition;
    };

    vm.resetForm = function () {
      vm.formData = {};
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