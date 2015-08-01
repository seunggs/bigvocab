(() => {
  'use strict';

  class ReviewWordsCtrl {
    constructor(WordsService, $stateParams, $moment, Sm2Service) {

      let vm = this;

      // config ////////////////////////////////////////////////////////////////////////////

      let collectionId = $stateParams.collectionId;
      vm.wordCounter = 0; // keeps track of which word user is reviewing
      vm.showAnswer = false;
      
      // init //////////////////////////////////////////////////////////////////////////////

      WordsService.getDue(collectionId)
        .then(res => {
          vm.words = angular.fromJson(res).data;
          vm.totalWordsCount = vm.words.length;
          vm.currentWord = vm.words[vm.wordCounter];
        })
        .catch(err => {
          console.log('Something went wrong: ', err);
        });

      // main //////////////////////////////////////////////////////////////////////////////

      vm.toggleAnswer = () => {
        vm.showAnswer = !vm.showAnswer;
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
          .then((dbRes) => {
            vm.wordCounter++;
            vm.currentWord = vm.words[vm.wordCounter];
            vm.toggleAnswer();
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
