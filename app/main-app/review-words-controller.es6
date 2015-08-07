(() => {
  'use strict';

  class ReviewWordsCtrl {
    constructor(WordsService, $stateParams, $moment, Sm2Service, ConfigService, DictionaryService, TextConvertService, $sce, ngAudio) {

      let vm = this;

      // config ////////////////////////////////////////////////////////////////////////////

      let collectionId = $stateParams.collectionId;
      vm.wordCounter = 0; // keeps track of which word user is reviewing
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
          vm.pronunciation = pronunciationPath !== null ? ngAudio.load(pronunciationPath) : null;

          // initialize the edit form inputs
          initEditWord(vm.currentWord);
        })
        .catch(errorHandler);

      // helper functions /////////////////////////////////////////////////////////////////

      function errorHandler (err) {
        console.log('Something went wrong: ', err);
      }

      function getCurrentWord (wordCounter, words) {
        let currentWord = words[wordCounter];
        console.log(words);
        currentWord.definition = TextConvertService.fromHtml(currentWord.definition);

        return currentWord;
      }

      function initEditWord (currentWord) {
        vm.formData.word = currentWord.word;
        vm.formData.definition = currentWord.definition;
      }

      // main //////////////////////////////////////////////////////////////////////////////

      vm.toggleAnswer = () => {
        vm.showAnswer = !vm.showAnswer;
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

            vm.toggleAnswer();

            // intialize edit fields
            initEditWord(vm.currentWord);
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
            vm.toggleAnswer();
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
