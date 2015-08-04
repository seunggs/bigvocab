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

      // helper functions /////////////////////////////////////////////////////////////////

      function addWord (word) {
        vm.btnState.loading = true;

        vm.definitions = []; // reset definition list

        WordsService.create(word)
          .then(() => {
            vm.btnState.loading = false;
            vm.btnState.success = true;
            $timeout(() => {
              vm.btnState.success = false;
            }, 1500);
          })
          .catch(err => {
            vm.btnState.loading = false;
            console.log('Something went wrong: ', err);
          });
      }

      function getPronunciation (forvoKey, word) {
        if (word !== undefined) {
          return DictionaryService.getPronunciation(forvoKey, word);
        }
      }

      function resetForm () {
        vm.addWordForm.word.$touched = false;
        vm.addWordForm.definition.$touched = false;
        vm.addWordForm.$submitted = false;
        vm.formData = {};
      }

      // main /////////////////////////////////////////////////////////////////////////////

      vm.getDefinition = word => {
        if (word !== undefined) {
          DictionaryService.getDefinition(ConfigService.mashapeKey, word)
            .then(res => {
              vm.definitions = res.data.definitions;
            })
            .catch(err => {
              console.log('Something went wrong; ', err);
            });
        }
      };

      vm.addWord = (isValid, formData) => {
        if (!isValid) { return; }
        
        getPronunciation(ConfigService.forvoKey, formData.word)
          .then(res => {
            let pronunciationData = angular.fromJson(res).data;
            let pronunciationPath = pronunciationData.attributes.total !== 0 ? pronunciationData.items[0].pathmp3 : null;

            let lastReviewed = $moment();
            let lastReviewedEpochTime = lastReviewed.unix();
            let nextReview = $moment().add(1, 'minutes');
            let nextReviewEpochTime = nextReview.unix();

            let word = {
              word: formData.word,
              definition: formData.definition,
              collectionId: collectionId,
              lastReviewedEpochTime: lastReviewedEpochTime,
              interval: 1,
              nextReviewEpochTime: nextReviewEpochTime,
              phase: 'learning',
              pronunciationPath: pronunciationPath,
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
          })
          .catch(err => {
            console.log('Something went wrong; ', err);
          });

      };

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
