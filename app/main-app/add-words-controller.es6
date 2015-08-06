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
      vm.collectionId = $stateParams.collectionId;
      vm.notification = {
        success: false,
        error: false
      };
      vm.msg = {
        success: 'Word successfully added!',
        error: 'Something went wrong. Please try again.'
      };
      vm.notificationSuccessMsg = vm.msg.success;
      vm.notificationErrorMsg = vm.msg.error;
      vm.showModal = false;

      // helper functions //////////////////////////////////////////////////////////////////
      
      function submitSuccessHandler () {
        vm.btnState.loading = false;
        vm.btnState.success = true;

        resetForm();
        vm.definitions = []; // reset definition list

        vm.notification.success = true;

        $timeout(() => {
          vm.btnState.success = false;
        }, 1500);
      }

      function submitErrorHandler (err) {
        vm.btnState.loading = false;

        vm.notification.error = true;

        console.log('Something went wrong: ', err);
      }

      function toHtml (text) {
        let convertedText = text.replace(/\n/g, '<br>');
        return convertedText;
      }

      function composeWordDetails (collectionId, formData) {
        let lastReviewed = $moment();
        let lastReviewedEpochTime = lastReviewed.unix();
        let nextReview = $moment().add(1, 'minutes');
        let nextReviewEpochTime = nextReview.unix();

        let convertedDefinition = toHtml(formData.definition);

        let word = {
          word: formData.word,
          definition: convertedDefinition,
          collectionId: collectionId,
          lastReviewedEpochTime: lastReviewedEpochTime,
          interval: 1,
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

        return word;
      }

      function addWord (collectionId, formData) {
        var word = composeWordDetails(collectionId, formData);

        getPronunciation(ConfigService.forvoKey, formData.word)
          .then(res => {
            let pronunciationData = angular.fromJson(res).data;
            let pronunciationPath = pronunciationData.attributes.total !== 0 ? pronunciationData.items[0].pathmp3 : null;

            word.pronunciationPath = pronunciationPath;

            return WordsService.create(word);
          })
          .catch(err => {
            console.log('Something went wrong while trying to get pronuncation from Forvo: ', err);

            return WordsService.create(word);
          })
          .then(submitSuccessHandler)
          .catch(submitErrorHandler);
      }

      function updateWord (collectionId, formData) {
        var word = composeWordDetails(collectionId, formData);

        WordsService.find(collectionId, formData.word)
          .then(res => {
            var wordId = angular.fromJson(res).data[0].id;
            return WordsService.update(wordId, word);
          })
          .then(submitSuccessHandler)
          .catch(submitErrorHandler);
      }

      function checkDuplicate (collectionId, formData) {
        WordsService.exists(collectionId, formData.word)
          .then(res => {
            console.log('checkDuplicate res: ', res);
            var isDuplicate = angular.fromJson(res).data;

            if (isDuplicate) { 
              vm.showModal = true;
              vm.btnState.loading = false;
            } else {
              addWord(collectionId, formData);
            }
          })
          .catch(err => {
            console.log('checkDuplicate err: ', err);
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

      vm.modalClose = () => {
        vm.showModal = false;
      };

      vm.modalYes = (collectionId, formData) => {
        updateWord(collectionId, formData);
      };

      vm.modalNo = (collectionId, formData) => {
        addWord(collectionId, formData);
      };

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

      vm.submit = (isValid, collectionId, formData) => {
        if (!isValid) { return; }

        vm.btnState.loading = true;

        checkDuplicate(collectionId, formData);
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
