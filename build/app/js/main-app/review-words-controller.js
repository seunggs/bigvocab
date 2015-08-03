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
      getPronunciation(vm.currentWord.word);
    })['catch'](function (err) {
      console.log('Something went wrong: ', err);
    });

    // helper functions /////////////////////////////////////////////////////////////////

    function getPronunciation(word) {
      if (word !== undefined) {
        DictionaryService.getPronunciation(ConfigService.forvoKey, word).then(function (res) {
          console.log(res);
          var pronunciationData = angular.fromJson(res).data;
          vm.pronunciation = pronunciationData.attributes.total !== 0 ? ngAudio.load(pronunciationData.items[0].pathmp3) : null;
        })['catch'](function (err) {
          console.log('Something went wrong; ', err);
        });
      }
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

      WordsService.update(word.id, wordUpdate).then(function () {
        vm.wordCounter++;
        vm.currentWord = vm.words[vm.wordCounter];
        vm.toggleAnswer();
        getPronunciation(vm.currentWord.word);
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