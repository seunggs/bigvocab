(() => {
  'use strict';

  class ReviewWordsCtrl {
    constructor(WordsService, $stateParams, $moment, Sm2Service) {

      let vm = this;

      // config ////////////////////////////////////////////////////////////////////////////

      let collectionId = $stateParams.collectionId;
      vm.wordCounter = 0; // keeps track of which word user is reviewing
      
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

      vm.submitRes = (word, choice) => {

        let newEaseFactor = Sm2Service.calcEaseFactor(word.easeFactor, choice);
        let newPhase = Sm2Service.calcPhase(word.phase, word.interval, choice);
        let newInterval = Sm2Service.calcInterval(word.phase, word.interval, word.easeFactor, choice);
        let newNextReview = Sm2Service.calcNextReview(newInterval);
        let newNextReviewEpochTime = newNextReview.unix();

        let newReviewRes = angular.copy(word.reviewRes);
        newReviewRes[choice]++;

        let wordUpdate = {
          reviewRes: newReviewRes,
          lastReviewed: $moment(),
          easeFactor: newEaseFactor,
          phase: newPhase,
          interval: newInterval,
          nextReview: newNextReview,
          nextReviewEpochTime: newNextReviewEpochTime
        };

        WordsService.update(word.id, wordUpdate)
          .then((dbRes) => {
            vm.wordCounter++;
            vm.currentWord = vm.words[vm.wordCounter];
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
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
