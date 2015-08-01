(() => {
  'use strict';

  class ImportCtrl {
    constructor(ImportService, user, $timeout, $window) {

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

      // helper functions /////////////////////////////////////////////////////////////////

      function importTextfile (userId, data) {
        
        vm.btnState.loading = true;

        ImportService.anki(userId, data)
          .then(res => {
            vm.btnState.loading = false;
            vm.btnState.success = true;
            
            var dbRes = angular.fromJson(res).data;
            
            $timeout(() => {
              vm.btnState.success = false;
              $window.location.href = '/#/main-app/collections'
            }, 1500)

          })
          .catch(err => {
            vm.btnState.loading = false;
            console.log('Something went wrong: ', err);
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
