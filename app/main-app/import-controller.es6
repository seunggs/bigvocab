(() => {
  'use strict';

  class ImportCtrl {
    constructor(ImportService, user, $scope, R) {

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
        ImportService.anki(userId, data)
          .then(res => {
            var dbRes = angular.fromJson(res).data;
            console.log(dbRes);
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
          });
      }

      // main /////////////////////////////////////////////////////////////////////////////

      vm.importTextfile = (isValid, formData) => {

        if (!isValid) { return; }

        console.log(formData);
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
