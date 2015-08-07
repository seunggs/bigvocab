(() => {
  'use strict';

  class TopMenuCtrl {
    constructor($state) {

      let vm = this;
      
      vm.formData = {};

      function resetForm () {
        vm.formData = {};
      }

      vm.submitSearch = (isValid, searchString) => {
        if (!isValid) { return; }

        resetForm();
        $state.go('mainApp.list-words', { searchString: searchString });
      };

    }
  }

  /**
   * @ngdoc object
   * @name mainApp.controller:TopMenuCtrl
   *
   * @description
   *
   */
  angular
    .module('mainApp')
    .controller('TopMenuCtrl', TopMenuCtrl);
}());
