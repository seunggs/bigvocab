'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var ReviewWordsCtrl = function ReviewWordsCtrl(WordsService, $stateParams, $moment, $timeout, Sm2Service, ConfigService, DictionaryService, TextConvertService, $sce, ngAudio) {
    _classCallCheck(this, ReviewWordsCtrl);

    var vm = this;

    // config ////////////////////////////////////////////////////////////////////////////

    var collectionId = $stateParams.collectionId;
    vm.wordCounter = 0; // keeps track of which word user is reviewing
    vm.showWord = true;
    vm.showAnswer = false;
    vm.editToggle = false;
    vm.formData = {};
    vm.finished = false;
    vm.notification = {
      success: false,
      error: false
    };
    vm.msg = {
      success: 'Change successfully saved!',
      error: 'Something went wrong. Please try again.'
    };
    vm.notificationSuccessMsg = vm.msg.success;
    vm.notificationErrorMsg = vm.msg.error;

    // init //////////////////////////////////////////////////////////////////////////////

    WordsService.getDue(collectionId).then(function (res) {
      vm.words = angular.fromJson(res).data;
      vm.totalWordsCount = vm.words.length;

      vm.currentWord = getCurrentWord(vm.wordCounter, vm.words);

      // get pronunciation of the current word
      return DictionaryService.getPronunciation(ConfigService.forvoKey, vm.currentWord.word);
    }).then(function (pronunciationPath) {
      console.log(pronunciationPath);
      vm.pronunciation = pronunciationPath !== null ? ngAudio.load(pronunciationPath) : null;

      // initialize the edit form inputs
      initEditWord(vm.currentWord);
    })['catch'](pronunciationErrorHandler);

    // helper functions /////////////////////////////////////////////////////////////////

    function pronunciationErrorHandler() {
      vm.pronunciation = null;
    }

    function getCurrentWord(wordCounter, words) {
      var currentWord = words[wordCounter];
      currentWord.definition = TextConvertService.fromHtml(currentWord.definition);

      return currentWord;
    }

    function initEditWord(currentWord) {
      vm.formData.word = currentWord.word;
      vm.formData.definition = currentWord.definition;
    }

    // main //////////////////////////////////////////////////////////////////////////////

    vm.revealWord = function () {
      vm.showWord = true;
    };

    vm.hideWord = function () {
      vm.showWord = false;
    };

    vm.revealAnswer = function () {
      vm.showAnswer = true;
    };

    vm.hideAnswer = function () {
      vm.showAnswer = false;
    };

    vm.toggleEdit = function () {
      vm.editToggle = !vm.editToggle;
    };

    vm.playPronunciation = function () {
      if (vm.pronunciation !== null) {
        vm.pronunciation.play();
      }
    };

    vm.submitEdit = function (wordId, word, definition) {
      var wordUpdate = {
        word: word,
        definition: TextConvertService.toHtml(definition)
      };

      WordsService.update(wordId, wordUpdate).then(function () {
        vm.currentWord.word = word;
        vm.currentWord.definition = TextConvertService.fromHtml(definition);

        vm.notification.success = true;

        vm.toggleEdit();
      })['catch'](function (err) {
        vm.notification.error = true;
        console.log('Something went wrong: ', err);
      });
    };

    vm.submitRes = function (word, choice) {

      vm.hideWord();
      vm.hideAnswer();

      var newEaseFactor = Sm2Service.calcEaseFactor(word.easeFactor, choice);
      var newPhase = Sm2Service.calcPhase(word.phase, word.interval, choice);
      var newInterval = Sm2Service.calcInterval(word.phase, word.interval, word.easeFactor, choice);
      var lastReviewed = $moment();
      var lastReviewedEpochTime = lastReviewed.unix();
      var newNextReview = Sm2Service.calcNextReview(newInterval);
      var newNextReviewEpochTime = newNextReview.unix();

      var newReviewRes = angular.copy(word.reviewRes);
      newReviewRes[choice]++;

      var wordUpdate = {
        reviewRes: newReviewRes,
        lastReviewedEpochTime: lastReviewedEpochTime,
        easeFactor: newEaseFactor,
        phase: newPhase,
        interval: newInterval,
        nextReviewEpochTime: newNextReviewEpochTime
      };

      WordsService.update(word.id, wordUpdate).then(function () {
        vm.wordCounter++;
        vm.currentWord = vm.words[vm.wordCounter];

        if (vm.currentWord === undefined) {
          vm.finished = true;
        } else {
          vm.currentWord.definition = TextConvertService.fromHtml(vm.currentWord.definition);

          // get pronunciation of the current word
          return DictionaryService.getPronunciation(ConfigService.forvoKey, vm.currentWord.word);
        }
      }).then(function (pronunciationPath) {
        vm.pronunciation = pronunciationPath !== null ? ngAudio.load(pronunciationPath) : null;

        // intialize edit fields
        initEditWord(vm.currentWord);
      })['catch'](pronunciationErrorHandler).then(function () {
        vm.hideAnswer();
        vm.revealWord();
      });
    };
  };

  /**
   * @ngdoc object
   * @name mainApp.controller:ReviewWordsCtrl
   *
   * @description
   *
   */
  angular.module('mainApp').controller('ReviewWordsCtrl', ReviewWordsCtrl);
})();
//# sourceMappingURL=../main-app/review-words-controller.js.map