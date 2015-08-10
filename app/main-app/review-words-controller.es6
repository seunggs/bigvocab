(() => {
  'use strict';

  class ReviewWordsCtrl {
    constructor(WordsService, UsersService, $stateParams, $moment, $timeout, Sm2Service, ConfigService, DictionaryService, TextConvertService, $sce, ngAudio, user) {

      let vm = this;

      // config ////////////////////////////////////////////////////////////////////////////

      let collectionId = $stateParams.collectionId;
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

      WordsService.getDue(collectionId)
        .then(res => {
          vm.words = angular.fromJson(res).data;
          vm.totalWordsCount = vm.words.length;

          vm.currentWord = getNextWord(vm.wordCounter, vm.words);
          
          // handle pronunciations
          if (vm.currentWord.pronunciations !== undefined) {
            vm.pronunciations = vm.currentWord.pronunciations;
          } else {
            pronunciationFallback(vm.currentWord);
          }

          // initialize the edit form inputs
          vm.formData = initEditWord(vm.currentWord);
        })
        .catch(submitErrorHandler);

      // helper functions /////////////////////////////////////////////////////////////////
      
      function submitErrorHandler (err) {
        vm.notification.error = true;
        console.log('Something went wrong: ', err);
      }

      function initEditWord (currentWord) {
        return {
          word: currentWord.word,
          definition: currentWord.definition
        };
      }

      // IMPURE
      function getNextWord (wordCounter, words) {
        let currentWord = words[wordCounter];

        if (currentWord === undefined) { return undefined; }

        currentWord.definition = TextConvertService.fromHtml(currentWord.definition);

        return currentWord;
      }

      function isFinished (currentWord) {
        return currentWord === undefined ? true : false;
      }

      // IMPURE
      function pronunciationFallback (wordObj) {
        // fallback if there are no pronunciations in the word obj
        DictionaryService.getPronunciationMw(wordObj.word)
          .then(pronunciationPaths => {
            vm.pronunciations = angular.fromJson(pronunciationPaths).data;

            // and add the pronunciations to the word while we're at it
            return WordsService.update(wordObj.id, { pronunciations: vm.pronunciations });
          })
          .then(() => {
            console.log('Successfully added pronunciations');
          })
          .catch(err => {
            console.log('Adding pronunciations failed: ', err);
          });
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

      vm.deleteWord = wordId => {
        WordsService.delete(wordId)
          .then(() => {
            vm.notification.success = true;
            vm.toggleEdit();
            getNextWord();
          })
          .catch(submitErrorHandler);
      };

      vm.closeModal = () => {
        vm.showModal = false;
      };

      vm.playPronunciation = pronunciation => {
        let pronunciationAudioObj = ngAudio.load(pronunciation);
        pronunciationAudioObj.play();
      };

      vm.submitDelete = wordId => {
        vm.deleteId = wordId;
        vm.showModal = true;
      };

      vm.submitEdit = (wordId, wordStr, definition) => {
        let wordUpdate = {
          word: wordStr,
          definition: TextConvertService.toHtml(definition)
        };

        WordsService.update(wordId, wordUpdate)
          .then(() => {
            vm.currentWord.word = wordStr;
            vm.currentWord.definition = TextConvertService.fromHtml(definition);
            
            vm.notification.success = true;
            vm.toggleEdit();
          })
          .catch(submitErrorHandler);
      };

      vm.submitRes = (wordObj, choice) => {

        vm.hideWord();
        vm.hideAnswer();

        let newEaseFactor = Sm2Service.calcEaseFactor(wordObj.easeFactor, choice);
        let newPhase = Sm2Service.calcPhase(wordObj.phase, wordObj.interval, choice);
        let newInterval = Sm2Service.calcInterval(wordObj.phase, wordObj.interval, wordObj.easeFactor, choice);
        let lastReviewed = $moment();
        let lastReviewedEpochTime = lastReviewed.unix();
        let newNextReview = Sm2Service.calcNextReview(newInterval);
        let newNextReviewEpochTime = newNextReview.unix();

        let newReviewRes = angular.copy(wordObj.reviewRes);
        newReviewRes[choice]++;

        let wordUpdate = {
          reviewRes: newReviewRes,
          lastReviewedEpochTime: lastReviewedEpochTime,
          easeFactor: newEaseFactor,
          phase: newPhase,
          interval: newInterval,
          nextReviewEpochTime: newNextReviewEpochTime
        };

        WordsService.update(wordObj.id, wordUpdate)
          .then(() => {
            vm.wordCounter++;
            vm.currentWord = getNextWord(vm.wordCounter, vm.words);

            // check to see if there are no more words
            vm.finished = isFinished(vm.currentWord);
            
            if (vm.finished) { return; }

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
          })
          .catch(submitErrorHandler);

        // update study count for today
        vm.studyCountToday++;
        console.log('vm.studyCountToday: ', vm.studyCountToday);

        UsersService.update(user.id, { studyCountToday: vm.studyCountToday })
          .catch(err => {
            console.log('Something went wrong while updating study count for today: ', err);
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
