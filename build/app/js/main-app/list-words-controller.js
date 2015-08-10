'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var ListWordsCtrl = function ListWordsCtrl($stateParams, CollectionsService, WordsService, TextConvertService, ConfigService, DictionaryService, $timeout, user, ngAudio) {
    _classCallCheck(this, ListWordsCtrl);

    var vm = this;

    // config ////////////////////////////////////////////////////////////////////////////

    vm.formData = {};
    vm.showEdit = {};
    vm.displayLimit = 200;
    vm.btnState = {
      loading: false,
      success: false
    };
    vm.notification = {
      success: false,
      error: false
    };
    vm.msg = {
      success: 'Change successfully saved!',
      deleteSuccess: 'Word deleted succesfully',
      error: 'Something went wrong. Please try again.',
      pronunciationError: 'Sorry - pronunciation for this word cannot be found.'
    };
    vm.notificationSuccessMsg = vm.msg.success;
    vm.notificationErrorMsg = vm.msg.error;

    // init //////////////////////////////////////////////////////////////////////////////

    getAllWords(user.id);

    if ($stateParams.searchString !== null) {
      vm.formData.searchWords = $stateParams.searchString;
    }

    document.getElementById('searchWords').focus();

    // helper functions //////////////////////////////////////////////////////////////////

    function submitErrorHandler(err) {
      vm.btnState.loading = false;
      vm.notification.error = true;
      console.log('Something went wrong: ', err);
    }

    function getAllWords(userId) {
      WordsService.getUserAll(userId).then(function (res) {
        var words = angular.fromJson(res).data;

        vm.words = words;
        vm.wordsCount = words.length;

        vm.words.map(function (word) {
          word.definition = TextConvertService.fromHtml(word.definition);
          return word;
        });

        initShowEdit(words);
      })['catch'](submitErrorHandler);
    }

    function initShowEdit(words) {
      words.map(function (word) {
        vm.showEdit[word.id] = false;
        return word;
      });
    }

    // main //////////////////////////////////////////////////////////////////////////////

    vm.toggleEdit = function (word) {
      vm.formData.word = word.word;
      vm.formData.definition = word.definition;

      vm.showEdit[word.id] = !vm.showEdit[word.id];
    };

    vm.modalYes = function (wordId) {
      WordsService['delete'](wordId).then(function () {
        // update the current view to reflect the removal
        var currentWord = vm.words.filter(function (currentWord) {
          return currentWord.id === wordId;
        })[0];
        var index = vm.words.indexOf(currentWord);
        vm.words.splice(index, 1);

        vm.notificationSuccessMsg = vm.msg.deleteSuccess;
        vm.notification.success = true;
      })['catch'](submitErrorHandler);
    };

    vm.modalClose = function () {
      vm.showModal = false;
      // delete the item on local
    };

    vm.playPronunciation = function (word) {
      if (word.pronunciations !== [] && word.pronunciations !== undefined) {
        var pronunciation = ngAudio.load(word.pronunciations[0]);
        pronunciation.play();
      }
    };

    vm.saveChanges = function (isValid, word, formData) {
      if (!isValid) {
        return;
      }

      WordsService.update(word.id, formData).then(function () {
        vm.btnState.loading = false;
        vm.btnState.success = true;

        vm.notificationSuccessMsg = vm.msg.success;
        vm.notification.success = true;

        $timeout(function () {
          vm.btnState.success = false;

          vm.showEdit[word.id] = !vm.showEdit[word.id];

          // update the current view to reflect the change
          vm.words.map(function (currentWord) {
            if (currentWord.id === word.id) {
              currentWord.word = vm.formData.word;
              currentWord.definition = TextConvertService.fromHtml(vm.formData.definition);
            }

            return currentWord;
          });
        }, 1500);
      })['catch'](submitErrorHandler);
    };

    vm.submitDelete = function (wordId) {
      vm.showModal = true;
      vm.selectedWordId = wordId;
    };
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:ListWordsCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('ListWordsCtrl', ListWordsCtrl);
})();
//# sourceMappingURL=../main-app/list-words-controller.js.map