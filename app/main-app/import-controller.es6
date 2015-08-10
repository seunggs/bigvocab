(() => {
  'use strict';

  class ImportCtrl {
    constructor(ImportService, WordsService, ConfigService, SettingsService, user, $timeout, $window) {

      let vm = this;
      
      // config ///////////////////////////////////////////////////////////////////////////

      vm.formData = {};
      vm.btnState = {
        loading: false,
        success: false
      };
      vm.placeholder = {
        files: 'Click to upload anki text files',
        collectionTitle: 'Add collection title here'
      };
      vm.notification = {
        success: false,
        error: false
      };
      vm.msg = {
        success: 'Words successfully imported!',
        error: 'Something went wrong. Please try again.'
      };
      vm.notificationSuccessMsg = vm.msg.success;
      vm.notificationErrorMsg = vm.msg.error;

      // helper functions /////////////////////////////////////////////////////////////////

      function importTextfile (userId, data) {
        
        vm.btnState.loading = true;

        ImportService.anki(userId, data)
          .then(dbRes => {
            let dbResData = angular.fromJson(dbRes).data;
            let collectionId = dbResData.generated_keys[0];

            return WordsService.getAll(collectionId);
          })
          .then(() => {
            vm.btnState.loading = false;
            vm.btnState.success = true;

            vm.notification.success = true;
            
            $timeout(() => {
              vm.btnState.success = false;
              $window.location.href = '/#/main-app/collections';
            }, 1500);
          })
          .catch(err => {
            vm.btnState.loading = false;

            vm.notification.error = true;

            console.log('Something went wrong with importing', err);
          });

      }

      // main /////////////////////////////////////////////////////////////////////////////

      vm.importTextfile = (isValid, formData) => {

        if (!isValid) { return; }

        importTextfile(user.id, formData);

      };

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:ImportCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('ImportCtrl', ImportCtrl);
}());
