'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

(function () {
  'use strict';

  var ReviewWordsCtrl = function ReviewWordsCtrl(WordsService, $stateParams, $moment, Sm2Service, ConfigService, DictionaryService, $sce, ngAudio) {
    _classCallCheck(this, ReviewWordsCtrl);

    var vm = this;

    // config ////////////////////////////////////////////////////////////////////////////

    var collectionId = $stateParams.collectionId;
    vm.wordCounter = 0; // keeps track of which word user is reviewing
    vm.showAnswer = false;

    // init //////////////////////////////////////////////////////////////////////////////

    WordsService.getDue(collectionId).then(function (res) {
      vm.words = angular.fromJson(res).data;
      vm.totalWordsCount = vm.words.length;
      vm.currentWord = vm.words[vm.wordCounter];
      vm.pronunciation = vm.currentWord !== undefined ? getPronunciation(vm.currentWord) : null;
    })['catch'](function (err) {
      console.log('Something went wrong: ', err);
    });

    // helper functions /////////////////////////////////////////////////////////////////

    function getPronunciation(word) {
      if (word === undefined || word.pronunciationPath === undefined || word.pronunciationPath === null) {
        return null;
      }

      return ngAudio.load(word.pronunciationPath);
    }

    // main //////////////////////////////////////////////////////////////////////////////

    vm.toggleAnswer = function () {
      vm.showAnswer = !vm.showAnswer;
    };

    vm.playPronunciation = function () {
      vm.pronunciation.play();
    };

    vm.submitRes = function (word, choice) {

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

      console.log('word id: ', word.id);

      WordsService.update(word.id, wordUpdate).then(function (dbRes) {
        vm.wordCounter++;
        vm.currentWord = vm.words[vm.wordCounter];
        console.log('vm.currentWord: ', vm.currentWord);
        vm.pronunciation = getPronunciation(vm.currentWord);
        vm.toggleAnswer();
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
        vm.toggleAnswer();
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