(() => {
  'use strict';

  class ListWordsCtrl {
    constructor(CollectionsService, WordsService, $timeout, user) {

      let vm = this;

			// config ////////////////////////////////////////////////////////////////////////////

      vm.formData = {};
      vm.showEdit = {};
      vm.displayLimit = 200;
      vm.btnState = {
        loading: false,
        success: false
      };
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

			getAllWords(user.id);

      // helper functions //////////////////////////////////////////////////////////////////

      function getAllWords (userId) {
	      WordsService.getUserAll(userId)
	      	.then(res => {
	      		var words = angular.fromJson(res).data;

	      		vm.words = words;
	      		vm.wordsCount = words.length;

	      		initShowEdit(words);
	      	})
	      	.catch(submitErrorHandler);
      }

      function initShowEdit (words) {
      	words.map(word => {
      		vm.showEdit[word.id] = false;
      		return word;
      	});
      }

      function submitErrorHandler (err) {
        vm.btnState.loading = false;
        vm.notification.error = true;
        console.log('Something went wrong: ', err);
      }

      // main //////////////////////////////////////////////////////////////////////////////

      vm.toggleEdit = word => {
    		vm.formData.word = word.word;
	  		vm.formData.definition = word.definition;

      	vm.showEdit[word.id] = !vm.showEdit[word.id];
      };

      vm.saveChanges = (isValid, word, formData) => {
      	if (!isValid) { return; }

      	WordsService.update(word.id, formData)
      		.then(() => {
            vm.btnState.loading = false;
            vm.btnState.success = true;

            vm.notification.success = true;

            $timeout(() => {
              vm.btnState.success = false;
	
	            vm.showEdit[word.id] = !vm.showEdit[word.id];

	            // update the current view to reflect the change
	            vm.words.map(currentWord => {
	            	if (currentWord.id === word.id) {
	            		currentWord.word = vm.formData.word;
	            		currentWord.definition = vm.formData.definition;
	            	}

	            	return currentWord;
	            }); 
	            //getAllWords(user.id);
            }, 1500);
      		})
      		.catch(submitErrorHandler);
      };

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:ListWordsCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('ListWordsCtrl', ListWordsCtrl);
}());
