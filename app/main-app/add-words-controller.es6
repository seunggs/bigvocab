(() => {
  'use strict';

  class AddWordsCtrl {
    constructor(ConfigService, DictionaryService, WordsService, $stateParams, $timeout, $moment) {

      let vm = this;

      // config
      vm.formData = {};
      vm.placeholder = {
        word: 'i.e. audacious',
        definition: 'i.e. Fearlessly, often recklessly daring; bold. See Synonyms at adventurous, brave.'
      };
      vm.btnState = {
        loading: false,
        success: false
      };
      vm.collectionId = $stateParams.collectionId;

      vm.lastReviewed = $moment();
      vm.nextReview = $moment().add(1, 'minutes');
      vm.lapsedTime = vm.lastReviewed.diff(vm.nextReview);

      // helper functions
      vm.getDefinition = word => {
        if (word !== undefined) {
          DictionaryService.getDefinition(ConfigService.mashapeKey, word)
            .then(res => {
              vm.definitions = res.data.definitions;
            });
        }
      };

      vm.addWord = (isValid, word) => {
        if (!isValid) { return; }

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

      vm.copyDefinition = definition => {
        vm.formData.definition = definition;
        vm.definitions = []; // reset definition list
      };

      vm.resetForm = () => {
        vm.addWordForm.word.$touched = false;
        vm.addWordForm.definition.$touched = false;
        vm.addWordForm.$submitted = false;
        vm.formData = {};
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
