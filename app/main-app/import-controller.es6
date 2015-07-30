(() => {
  'use strict';

  class ImportCtrl {
    constructor(ImportService) {

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
            var wordPairs = angular.fromJson(res).data;
            console.log(wordPairs);
          })
          .catch(err => {
            console.log('Something went wrong: ', err);
          });
      }

      // main /////////////////////////////////////////////////////////////////////////////

      vm.importTextfile = (isValid, formData) => {
        if (!isValid) { return; }

        console.log(formData);
        importTextfile(userId, formData);
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
