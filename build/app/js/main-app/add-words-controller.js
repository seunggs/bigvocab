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
    vm.showModal = false;

    // helper functions //////////////////////////////////////////////////////////////////

    function submitSuccessHandler() {
      vm.btnState.loading = false;
      vm.btnState.success = true;

      resetForm();
      vm.definitions = []; // reset definition list

      vm.notification.success = true;

      $timeout(function () {
        vm.btnState.success = false;
      }, 1500);
    }

    function submitErrorHandler(err) {
      vm.btnState.loading = false;

      vm.notification.error = true;

      console.log('Something went wrong: ', err);
    }

    function toHtml(text) {
      var convertedText = text.replace(/\n/g, '<br>');
      return convertedText;
    }

    function composeWordDetails(collectionId, formData) {
      var lastReviewed = $moment();
      var lastReviewedEpochTime = lastReviewed.unix();
      var nextReview = $moment().add(1, 'minutes');
      var nextReviewEpochTime = nextReview.unix();

      var convertedDefinition = toHtml(formData.definition);

      var word = {
        word: formData.word,
        definition: convertedDefinition,
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

      return word;
    }

    function addWord(collectionId, formData) {
      var word = composeWordDetails(collectionId, formData);

      getPronunciation(ConfigService.forvoKey, formData.word).then(function (res) {
        var pronunciationData = angular.fromJson(res).data;
        var pronunciationPath = pronunciationData.attributes.total !== 0 ? pronunciationData.items[0].pathmp3 : null;

        word.pronunciationPath = pronunciationPath;

        return WordsService.create(word);
      })['catch'](function (err) {
        console.log('Something went wrong while trying to get pronuncation from Forvo: ', err);

        return WordsService.create(word);
      }).then(submitSuccessHandler)['catch'](submitErrorHandler);
    }

    function updateWord(collectionId, formData) {
      var word = composeWordDetails(collectionId, formData);

      WordsService.find(collectionId, formData.word).then(function (res) {
        var wordId = angular.fromJson(res).data[0].id;
        return WordsService.update(wordId, word);
      }).then(submitSuccessHandler)['catch'](submitErrorHandler);
    }

    function checkDuplicate(collectionId, formData) {
      WordsService.exists(collectionId, formData.word).then(function (res) {
        console.log('checkDuplicate res: ', res);
        var isDuplicate = angular.fromJson(res).data;

        if (isDuplicate) {
          vm.showModal = true;
          vm.btnState.loading = false;
        } else {
          addWord(collectionId, formData);
        }
      })['catch'](function (err) {
        console.log('checkDuplicate err: ', err);
      });
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

    vm.modalClose = function () {
      vm.showModal = false;
    };

    vm.modalYes = function (collectionId, formData) {
      updateWord(collectionId, formData);
    };

    vm.modalNo = function (collectionId, formData) {
      addWord(collectionId, formData);
    };

    vm.getDefinition = function (word) {
      if (word !== undefined) {
        DictionaryService.getDefinition(ConfigService.mashapeKey, word).then(function (res) {
          vm.definitions = res.data.definitions;
        })['catch'](function (err) {
          console.log('Something went wrong; ', err);
        });
      }
    };

    vm.submit = function (isValid, collectionId, formData) {
      if (!isValid) {
        return;
      }

      vm.btnState.loading = true;

      checkDuplicate(collectionId, formData);
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