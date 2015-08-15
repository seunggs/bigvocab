'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var ReviewWordsCtrl = function ReviewWordsCtrl(WordsService, UsersService, $stateParams, $moment, $timeout, Sm2Service, ConfigService, DictionaryService, TextConvertService, $sce, ngAudio, user) {
    _classCallCheck(this, ReviewWordsCtrl);

    var vm = this;

    // config ////////////////////////////////////////////////////////////////////////////

    var collectionId = $stateParams.collectionId;
    vm.wordCounter = 0; // keeps track of which word user is reviewing
    vm.showWord = true;
    vm.showAnswer = false;
    vm.showModal = false;
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

    vm.studyCountToday = user.studyCountToday || 0;

    WordsService.getDue(collectionId).then(function (res) {
      vm.words = angular.fromJson(res).data;
      vm.totalWordsCount = vm.words.length;

      vm.currentWord = getNextWord(vm.wordCounter, vm.words);

      // check to see if there are no more words
      vm.finished = isFinished(vm.currentWord);

      if (vm.finished) {
        return;
      }

      // handle pronunciations
      if (vm.currentWord.pronunciations !== undefined) {
        vm.pronunciations = vm.currentWord.pronunciations;
      } else {
        pronunciationFallback(vm.currentWord);
      }

      // initialize the edit form inputs
      vm.formData = initEditWord(vm.currentWord);
    })['catch'](submitErrorHandler);

    // helper functions /////////////////////////////////////////////////////////////////

    function submitErrorHandler(err) {
      vm.notification.error = true;
      console.log('Something went wrong: ', err);
    }

    function initEditWord(currentWord) {
      return {
        word: currentWord.word,
        definition: currentWord.definition
      };
    }

    function getNextWord(wordCounter, words) {
      var currentWord = words[wordCounter];

      if (currentWord === undefined) {
        return undefined;
      }

      currentWord.definition = TextConvertService.fromHtml(currentWord.definition);

      return currentWord;
    }

    function isFinished(currentWord) {
      return currentWord === undefined ? true : false;
    }

    // IMPURE
    function pronunciationFallback(wordObj) {
      // fallback if there are no pronunciations in the word obj
      DictionaryService.updatePronunciationMw(wordObj).then(function (pronunciationPaths) {
        vm.pronunciations = angular.fromJson(pronunciationPaths).data;
        console.log('Successfully added pronunciations');
      })['catch'](function (err) {
        console.log('Adding pronunciations failed: ', err);
      });
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

    vm.deleteWord = function (wordId) {
      WordsService['delete'](wordId).then(function () {
        vm.notification.success = true;
        vm.toggleEdit();

        vm.wordCounter++;
        vm.currentWord = getNextWord(vm.wordCounter, vm.words);

        // check to see if there are no more words
        vm.finished = isFinished(vm.currentWord);

        if (vm.finished) {
          return;
        }

        // handle pronunciations
        if (vm.currentWord.pronunciations !== undefined) {
          vm.pronunciations = vm.currentWord.pronunciations;
        } else {
          pronunciationFallback(vm.currentWord);
        }

        // initialize the edit form inputs
        vm.formData = initEditWord(vm.currentWord);

        vm.hideAnswer();
        vm.revealWord();
      })['catch'](submitErrorHandler);
    };

    vm.closeModal = function () {
      vm.showModal = false;
    };

    vm.playPronunciation = function (pronunciation) {
      var pronunciationAudioObj = ngAudio.load(pronunciation);
      pronunciationAudioObj.play();
    };

    vm.submitDelete = function (wordId) {
      vm.deleteId = wordId;
      vm.showModal = true;
    };

    vm.submitEdit = function (wordId, wordStr, definition) {
      var wordUpdate = {
        word: wordStr,
        definition: TextConvertService.toHtml(definition)
      };

      WordsService.update(wordId, wordUpdate).then(function () {
        vm.currentWord.word = wordStr;
        vm.currentWord.definition = TextConvertService.fromHtml(definition);

        vm.notification.success = true;
        vm.toggleEdit();
      })['catch'](submitErrorHandler);
    };

    vm.submitRes = function (wordObj, choice) {

      vm.hideWord();
      vm.hideAnswer();

      var newEaseFactor = Sm2Service.calcEaseFactor(wordObj.easeFactor, choice);
      var newPhase = Sm2Service.calcPhase(wordObj.phase, wordObj.interval, choice);
      var newInterval = Sm2Service.calcInterval(wordObj.phase, wordObj.interval, wordObj.easeFactor, choice);
      var lastReviewed = $moment();
      var lastReviewedEpochTime = lastReviewed.unix();
      var newNextReview = Sm2Service.calcNextReview(newInterval);
      var newNextReviewEpochTime = newNextReview.unix();

      var newReviewRes = angular.copy(wordObj.reviewRes);
      newReviewRes[choice]++;

      var wordUpdate = {
        reviewRes: newReviewRes,
        lastReviewedEpochTime: lastReviewedEpochTime,
        easeFactor: newEaseFactor,
        phase: newPhase,
        interval: newInterval,
        nextReviewEpochTime: newNextReviewEpochTime
      };

      WordsService.update(wordObj.id, wordUpdate).then(function () {
        vm.wordCounter++;
        vm.currentWord = getNextWord(vm.wordCounter, vm.words);

        // check to see if there are no more words
        vm.finished = isFinished(vm.currentWord);

        if (vm.finished) {
          return;
        }

        // handle pronunciations
        if (vm.currentWord.pronunciations !== undefined) {
          vm.pronunciations = vm.currentWord.pronunciations;
        } else {
          pronunciationFallback(vm.currentWord);
        }

        // initialize the edit form inputs
        vm.formData = initEditWord(vm.currentWord);

        vm.hideAnswer();
        vm.revealWord();
      })['catch'](submitErrorHandler);

      // update study count for today
      vm.studyCountToday++;
      console.log('vm.studyCountToday: ', vm.studyCountToday);

      UsersService.update(user.id, { studyCountToday: vm.studyCountToday })['catch'](function (err) {
        console.log('Something went wrong while updating study count for today: ', err);
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