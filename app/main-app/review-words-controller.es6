(() => {
  'use strict';

  class ReviewWordsCtrl {
    constructor(WordsService, $stateParams, $moment, $timeout, Sm2Service, ConfigService, DictionaryService, TextConvertService, $sce, ngAudio) {

      let vm = this;

      // config ////////////////////////////////////////////////////////////////////////////

      let collectionId = $stateParams.collectionId;
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

      WordsService.getDue(collectionId)
        .then(res => {
          vm.words = angular.fromJson(res).data;
          vm.totalWordsCount = vm.words.length;

          vm.currentWord = getCurrentWord(vm.wordCounter, vm.words);

          // get pronunciation of the current word
          return DictionaryService.getPronunciation(ConfigService.forvoKey, vm.currentWord.word);
        })
        .then(pronunciationPath => {
          console.log(pronunciationPath);
          vm.pronunciation = pronunciationPath !== null ? ngAudio.load(pronunciationPath) : null;

        })
        .catch(pronunciationErrorHandler)
        .then(() => {
          // initialize the edit form inputs
          initEditWord(vm.currentWord);
        });

      // helper functions /////////////////////////////////////////////////////////////////

      function pronunciationErrorHandler () {
        vm.pronunciation = null;
      }

      function getCurrentWord (wordCounter, words) {
        let currentWord = words[wordCounter];
        currentWord.definition = TextConvertService.fromHtml(currentWord.definition);

        return currentWord;
      }

      function initEditWord (currentWord) {
        console.log(currentWord);
        vm.formData.word = currentWord.word;
        vm.formData.definition = currentWord.definition;
      }

      // main //////////////////////////////////////////////////////////////////////////////

      vm.revealWord = () => {
        vm.showWord = true;
      };

      vm.hideWord = () => {
        vm.showWord = false;
      };

      vm.revealAnswer = () => {
        vm.showAnswer = true;
      };

      vm.hideAnswer = () => {
        vm.showAnswer = false;
      };

      vm.toggleEdit = () => {
        vm.editToggle = !vm.editToggle;
      };

      vm.playPronunciation = () => {
        if (vm.pronunciation !== null) {
          vm.pronunciation.play();
        }
      };

      vm.submitEdit = (wordId, word, definition) => {
        let wordUpdate = {
          word: word,
          definition: TextConvertService.toHtml(definition)
        };

        WordsService.update(wordId, wordUpdate)
          .then(() => {
            vm.currentWord.word = word;
            vm.currentWord.definition = TextConvertService.fromHtml(definition);
            
            vm.notification.success = true;

            vm.toggleEdit();
          })
          .catch(err => {
            vm.notification.error = true;
            console.log('Something went wrong: ', err);
          });
      };

      vm.submitRes = (word, choice) => {

        vm.hideWord();
        vm.hideAnswer();

        let newEaseFactor = Sm2Service.calcEaseFactor(word.easeFactor, choice);
        let newPhase = Sm2Service.calcPhase(word.phase, word.interval, choice);
        let newInterval = Sm2Service.calcInterval(word.phase, word.interval, word.easeFactor, choice);
        let lastReviewed = $moment();
        let lastReviewedEpochTime = lastReviewed.unix();
        let newNextReview = Sm2Service.calcNextReview(newInterval);
        let newNextReviewEpochTime = newNextReview.unix();

        let newReviewRes = angular.copy(word.reviewRes);
        newReviewRes[choice]++;

        let wordUpdate = {
          reviewRes: newReviewRes,
          lastReviewedEpochTime: lastReviewedEpochTime,
          easeFactor: newEaseFactor,
          phase: newPhase,
          interval: newInterval,
          nextReviewEpochTime: newNextReviewEpochTime
        };

        WordsService.update(word.id, wordUpdate)
          .then(() => {
            vm.wordCounter++;
            vm.currentWord = vm.words[vm.wordCounter];

            if (vm.currentWord === undefined) {
              vm.finished = true;
            } else {
              vm.currentWord.definition = TextConvertService.fromHtml(vm.currentWord.definition);

              // get pronunciation of the current word
              return DictionaryService.getPronunciation(ConfigService.forvoKey, vm.currentWord.word);
            }
          })
          .then(pronunciationPath => {
            vm.pronunciation = pronunciationPath !== null ? ngAudio.load(pronunciationPath) : null;

            // intialize edit fields
            initEditWord(vm.currentWord);
          })
          .catch(pronunciationErrorHandler)
          .then(() => {
            vm.hideAnswer();
            vm.revealWord();
          });
      
      };

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:ReviewWordsCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('ReviewWordsCtrl', ReviewWordsCtrl);
}());
