(() => {
  'use strict';

  class AddWordsCtrl {
    constructor(ConfigService, DictionaryService, WordsService, $stateParams, $timeout, $moment) {

      let vm = this;

      // config //////////////////////////////////////////////////////////////////////////

      vm.formData = {};
      vm.placeholder = {
        word: 'i.e. audacious',
        definition: 'i.e. Fearlessly, often recklessly daring; bold. See Synonyms at adventurous, brave.'
      };
      vm.btnState = {
        loading: false,
        success: false
      };
      let collectionId = $stateParams.collectionId;

      // helper functions //////////////////////////////////////////////////////////////////

      function addWord (word) {
        vm.definitions = []; // reset definition list

        WordsService.create(word)
          .then(dbRes => {
            vm.btnState.success = true;
            $timeout(() => {
              vm.btnState.success = false;
            }, 1500);
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
          })
          .finally(() => {
            vm.btnState.loading = false;
          });
      };

      function resetForm () {
        vm.addWordForm.word.$touched = false;
        vm.addWordForm.definition.$touched = false;
        vm.addWordForm.$submitted = false;
        vm.formData = {};
      };

      // main ////////////////////////////////////////////////////////////////////////////

      vm.getDefinition = word => {
        if (word !== undefined) {
          DictionaryService.getDefinition(ConfigService.mashapeKey, word)
            .then(res => {
              vm.definitions = res.data.definitions;
            });
        }
      };

      vm.addWord = (isValid, formData) => {
        if (!isValid) { return; }
        
        let lastReviewed = $moment();
        let nextReview = $moment().add(1, 'minutes');
        let nextReviewEpochTime = nextReview.unix();

        let word = {
          word: formData.word,
          definition: formData.definition,
          collectionId: collectionId,
          lastReviewed: lastReviewed,
          interval: 1,
          nextReview: nextReview,
          nextReviewEpochTime: nextReviewEpochTime,
          phase: 'learning',
          reviewRes: {
            again: 0,
            hard: 0,
            good: 0,
            easy: 0
          },
          easeFactor: 2.5
        };

        addWord(word);
        
        resetForm();
      }

      vm.copyDefinition = definition => {
        vm.formData.definition = definition;
      };

      vm.resetForm = () => {
        resetForm();
      };

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:AddWordsCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('AddWordsCtrl', AddWordsCtrl);
}());
