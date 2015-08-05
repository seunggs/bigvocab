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
    vm.editToggle = false;
    vm.formData = {};
    vm.finished = false;

    // init //////////////////////////////////////////////////////////////////////////////

    WordsService.getDue(collectionId).then(function (res) {
      vm.words = angular.fromJson(res).data;
      vm.totalWordsCount = vm.words.length;
      vm.currentWord = vm.words[vm.wordCounter];

      if (vm.currentWord.pronunciationPath !== undefined) {
        vm.pronunciation = getPronunciation(vm.currentWord);
      } else {
        addPronunciation(ConfigService.forvoKey, vm.currentWord);
      }

      initEditWord(vm.currentWord);
    })['catch'](function (err) {
      console.log('Something went wrong: ', err);
    });

    // helper functions /////////////////////////////////////////////////////////////////

    function getPronunciation(word) {
      console.log(word);

      if (word === undefined || word.pronunciationPath === undefined || word.pronunciationPath === null) {
        return null;
      }

      return ngAudio.load(word.pronunciationPath);
    }

    function addPronunciation(forvoKey, word) {
      if (word !== undefined) {
        DictionaryService.getPronunciation(forvoKey, word).then(function (res) {
          var pronunciationData = angular.fromJson(res).data;
          var pronunciationPath = pronunciationData.attributes.total !== 0 ? pronunciationData.items[0].pathmp3 : null;

          vm.pronunciation = pronunciationPath;

          var wordUpdate = {
            pronunciationPath: pronunciationPath
          };

          return WordsService.update(vm.currentWord.id, wordUpdate);
        }).then(function () {
          console.log('Pronunciation successfully added');
        })['catch'](function (err) {
          vm.pronunciation = null;
          console.log('Pronunciation not added: ', err);
        });
      }
    }

    function initEditWord(currentWord) {
      vm.formData.word = currentWord.word;
      vm.formData.definition = currentWord.definition;
    }

    // main //////////////////////////////////////////////////////////////////////////////

    vm.toggleAnswer = function () {
      vm.showAnswer = !vm.showAnswer;
    };

    vm.toggleEdit = function () {
      vm.editToggle = !vm.editToggle;
    };

    vm.playPronunciation = function () {
      vm.pronunciation.play();
    };

    vm.submitEdit = function (wordId, word, definition) {
      var wordUpdate = {
        word: word,
        definition: definition
      };

      WordsService.update(wordId, wordUpdate).then(function () {
        vm.currentWord.word = word;
        vm.currentWord.definition = definition;

        vm.toggleEdit();
      })['catch'](function (err) {
        console.log('Something went wrong: ', err);
      });
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

        vm.finished = vm.currentWord === undefined ? true : false;

        if (vm.currentWord !== undefined && vm.currentWord.pronunciationPath !== undefined) {
          vm.pronunciation = getPronunciation(vm.currentWord);
        } else {
          addPronunciation(ConfigService.forvoKey, vm.currentWord);
        }

        vm.toggleAnswer();

        // intialize edit fields
        initEditWord(vm.currentWord);
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