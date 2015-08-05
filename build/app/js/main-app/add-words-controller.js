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
    vm.collectionId = $stateParams.collectionId;
    vm.notification = {
      success: false,
      error: false
    };
    vm.msg = {
      success: 'Word successfully added!',
      error: 'Something went wrong. Please try again.'
    };
    vm.notificationSuccessMsg = vm.msg.success;
    vm.notificationErrorMsg = vm.msg.error;

    // helper functions /////////////////////////////////////////////////////////////////

    function addWord(word) {
      vm.btnState.loading = true;

      vm.definitions = []; // reset definition list

      return WordsService.create(word);
    }

    function getPronunciation(forvoKey, word) {
      if (word !== undefined) {
        return DictionaryService.getPronunciation(forvoKey, word);
      }
    }

    function resetForm() {
      vm.addWordForm.word.$touched = false;
      vm.addWordForm.definition.$touched = false;
      vm.addWordForm.$submitted = false;
      vm.formData = {};
    }

    // main /////////////////////////////////////////////////////////////////////////////

    vm.getDefinition = function (word) {
      if (word !== undefined) {
        DictionaryService.getDefinition(ConfigService.mashapeKey, word).then(function (res) {
          vm.definitions = res.data.definitions;
        })['catch'](function (err) {
          console.log('Something went wrong; ', err);
        });
      }
    };

    vm.addWord = function (isValid, collectionId, formData) {
      if (!isValid) {
        return;
      }

      var lastReviewed = $moment();
      var lastReviewedEpochTime = lastReviewed.unix();
      var nextReview = $moment().add(1, 'minutes');
      var nextReviewEpochTime = nextReview.unix();

      var word = {
        word: formData.word,
        definition: formData.definition,
        collectionId: collectionId,
        lastReviewedEpochTime: lastReviewedEpochTime,
        interval: 1,
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

      getPronunciation(ConfigService.forvoKey, formData.word).then(function (res) {
        var pronunciationData = angular.fromJson(res).data;
        var pronunciationPath = pronunciationData.attributes.total !== 0 ? pronunciationData.items[0].pathmp3 : null;

        word.pronunciationPath = pronunciationPath;

        return addWord(word);
      })['catch'](function (err) {
        console.log('Something went wrong while trying to get pronuncation from Forvo: ', err);

        return addWord(word);
      }).then(function () {
        vm.btnState.loading = false;
        vm.btnState.success = true;

        resetForm();

        vm.notification.success = true;

        $timeout(function () {
          vm.btnState.success = false;
        }, 1500);
      })['catch'](function (err) {
        vm.btnState.loading = false;

        vm.notification.error = true;

        console.log('Something went wrong: ', err);
      });
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