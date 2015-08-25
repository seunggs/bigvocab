'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var AddWordsCtrl = function AddWordsCtrl(ConfigService, DictionaryService, WordsService, TextConvertService, $stateParams, $timeout, $moment, $q) {
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
    vm.mashapeKey = ConfigService.mashapeKey;
    vm.wordNotFound = false;

    // helper functions //////////////////////////////////////////////////////////////////

    function submitSuccessHandler() {
      vm.btnState.loading = false;
      vm.btnState.success = true;

      resetForm();
      vm.definitions = []; // reset definition list

      vm.notification.success = true;
      document.getElementById('addWords').focus();

      $timeout(function () {
        vm.btnState.success = false;
      }, 1500);
    }

    function submitErrorHandler(err) {
      vm.btnState.loading = false;
      vm.notification.error = true;
      console.log('Something went wrong: ', err);
    }

    function composeWordDetails(collectionId, formData) {
      var lastReviewed = $moment();
      var lastReviewedEpochTime = lastReviewed.unix();
      var nextReview = $moment().add(1, 'minutes');
      var nextReviewEpochTime = nextReview.unix();

      var convertedDefinition = TextConvertService.toHtml(formData.definition);

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
      var wordObj = composeWordDetails(collectionId, formData);

      WordsService.create(wordObj).then(submitSuccessHandler)['catch'](submitErrorHandler);
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

    vm.getDefinition = function (mashapeKey, wordStr) {
      if (wordStr !== undefined) {
        DictionaryService.getDefinitionFree(mashapeKey, wordStr).then(function (res) {
          if (res.data.definitions.length === 0) {
            return $q.reject('No words found.');
          }

          vm.wordNotFound = false;
          vm.definitions = res.data.definitions;
        })['catch'](function (err) {
          vm.definitions = [{ text: 'Sorry - this word could not be found.' }];
          vm.wordNotFound = true;
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
      if (vm.formData.definition !== undefined) {
        vm.formData.definition = vm.formData.definition + '\n\n' + definition;
      } else {
        vm.formData.definition = definition;
      }
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