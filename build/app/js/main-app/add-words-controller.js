'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var AddWordsCtrl = function AddWordsCtrl(ConfigService, DictionaryService, WordsService, $stateParams, $timeout, $moment) {
    _classCallCheck(this, AddWordsCtrl);

    var vm = this;

    // config
    vm.formData = {};
    vm.placeholder = {
      word: 'i.e. audacious',
      definition: 'i.e. Fearlessly, often recklessly daring; bold. See Synonyms at adventurous, brave.'
    };
    vm.btnState = {
      loading: false,
      success: false
    };
    vm.collectionId = $stateParams.collectionId;

    vm.lastReviewed = $moment();
    vm.nextReview = $moment().add(1, 'minutes');
    vm.lapsedTime = vm.lastReviewed.diff(vm.nextReview);

    // helper functions
    vm.getDefinition = function (word) {
      if (word !== undefined) {
        DictionaryService.getDefinition(ConfigService.mashapeKey, word).then(function (res) {
          vm.definitions = res.data.definitions;
        });
      }
    };

    vm.addWord = function (isValid, word) {
      if (!isValid) {
        return;
      }

      WordsService.create(word).then(function (dbRes) {
        vm.btnState.success = true;
        $timeout(function () {
          vm.btnState.success = false;
        }, 1500);
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
      })['finally'](function () {
        vm.btnState.loading = false;
      });
    };

    vm.copyDefinition = function (definition) {
      vm.formData.definition = definition;
      vm.definitions = []; // reset definition list
    };

    vm.resetForm = function () {
      vm.addWordForm.word.$touched = false;
      vm.addWordForm.definition.$touched = false;
      vm.addWordForm.$submitted = false;
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