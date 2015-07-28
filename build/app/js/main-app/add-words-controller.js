'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var AddWordsCtrl = function AddWordsCtrl(ConfigService, DictionaryService, WordsService, $stateParams, $timeout, $moment) {
    _classCallCheck(this, AddWordsCtrl);

    var vm = this;

    // config //////////////////////////////////////////////////////////////////////////

    vm.formData = {};
    vm.placeholder = {
      word: 'i.e. audacious',
      definition: 'i.e. Fearlessly, often recklessly daring; bold. See Synonyms at adventurous, brave.'
    };
    vm.btnState = {
      loading: false,
      success: false
    };
    var collectionId = $stateParams.collectionId;

    // helper functions //////////////////////////////////////////////////////////////////

    function addWord(word) {
      vm.definitions = []; // reset definition list

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

    function resetForm() {
      vm.addWordForm.word.$touched = false;
      vm.addWordForm.definition.$touched = false;
      vm.addWordForm.$submitted = false;
      vm.formData = {};
    };

    // main ////////////////////////////////////////////////////////////////////////////

    vm.getDefinition = function (word) {
      if (word !== undefined) {
        DictionaryService.getDefinition(ConfigService.mashapeKey, word).then(function (res) {
          vm.definitions = res.data.definitions;
        });
      }
    };

    vm.addWord = function (isValid, formData) {
      if (!isValid) {
        return;
      }

      var lastReviewed = $moment();
      var nextReview = $moment().add(1, 'minutes');
      var nextReviewEpochTime = nextReview.unix();

      var word = {
        word: formData.word,
        definition: formData.definition,
        collectionId: collectionId,
        lastReviewed: lastReviewed,
        interval: 1,
        nextReview: nextReview,
        nextReviewEpochTime: nextReviewEpochTime,
        phase: 'learning',
        reviewRes: {
          again: 0,
          hard: 0,
          good: 0,
          easy: 0
        },
        easeFactor: 2.5
      };

      addWord(word);

      resetForm();
    };

    vm.copyDefinition = function (definition) {
      vm.formData.definition = definition;
    };

    vm.resetForm = function () {
      resetForm();
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